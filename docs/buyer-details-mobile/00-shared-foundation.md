# Part 00: Shared foundation

Do this first. The Buyer, Spouse, Co-Buyer, Representative and PEP parts all use these values and building blocks.
Most of the mobile fixes come from getting these right once.

---

## 1. Spacing and type scale

| Thing | Phone (`< md`) | Desktop (`md:`) |
|---|---|---|
| Page side padding | `px-4` (16px) | `md:px-8` (32px) |
| Gap between big sections | `gap-8` | same |
| Gap inside a group of sections | `gap-6` | same |
| Section with inner blocks (note, radios, panel) | `gap-5` | same |
| Heading → its fields | `gap-3` | same |
| Grid columns | `grid-cols-1` | `md:grid-cols-2` / `md:grid-cols-3` |
| Grid gaps | `gap-y-3`, `gap-x-5` | same |
| Page title | `text-lg leading-7` | `md:text-2xl md:leading-8` |
| Section title (lg) | `text-base leading-6` | `md:text-lg md:leading-7` |
| Sub-section / card title (md) | `text-base leading-6` | same |
| Field label | `text-sm font-medium leading-5` | same |
| Input text / helper / description | `text-sm leading-5` | same |
| Small caption / chip | `text-xs leading-[18px]` | same |
| Tinted panel | `-mx-2 px-2 py-4` | `md:mx-0 md:p-5` |
| Plain gray question box | `p-4` | `md:p-5` |
| Card radius | `rounded-xl` | same |
| Outer form card | `rounded-none` (full-bleed) | `md:rounded-[16px]` |
| Input / select / date height | `h-8`, `text-sm` | same |

Rules:
1. **Always give `leading-*` together with `text-*`.** Without it, line height drifts and rows end up with different heights.
2. **Every grid cell needs `min-w-0`.** Otherwise long placeholders or values push the grid wider than the screen and you get horizontal scroll.
3. **Use `items-start` on grids.** A field with a hint or a checkbox below it shouldn't stretch its neighbours.
4. **Don't add phone-only margins between sections.** Use one `gap-*` on the parent flex column.
5. **Use `m-0` on every `h1`–`h4` and `p`** so browser default margins don't add hidden spacing.

---

## 2. Page shell + header

```tsx
<section className="form-lg w-full h-fit bg-white rounded-none md:rounded-[16px] flex flex-col border border-[#e4e8f0]">
  <StepHeader title="Client/Company Representative" className="px-4 md:px-8 pt-6 pb-6">
    Enter your personal information as it appears on your official records.
  </StepHeader>

  <div className="px-4 md:px-8 pb-6 flex flex-col gap-8">
    {/* client type cards (see 01-buyer) */}
    <div className="flex flex-col gap-6">
      {/* every section, separated by <Divider /> */}
    </div>
  </div>
</section>
```

```tsx
// StepHeader
<div className={"flex flex-col gap-1 " + className}>
  <h1 className="m-0 text-lg md:text-2xl leading-7 md:leading-8 font-bold text-brand-800">{title}</h1>
  <p className="m-0 text-sm leading-5 text-gray-600">{children}</p>
</div>

// Divider
<hr className="m-0 border-0 border-t border-gray-200" />
```

- The header and body use the **same** `px-4 md:px-8`, so their left edges line up.
- On phones the card goes edge to edge (`rounded-none`), so you don't lose screen width to a rounded frame.

---

## 3. Grids

```tsx
const GRID_3 = "grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-3 items-start";
const GRID_2 = "grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3 items-start";
```

- **Wide field:** `className="md:col-span-2"`. Don't use `col-span-2` without the prefix, because phones only have one column.
- **Spacer cell** that only lines things up on desktop: `<div className="hidden md:block" />`.
- **Single field that shouldn't be full width on desktop:** `md:w-1/3 md:pr-3.5` (one GRID_3 column) or `md:w-1/2 md:pr-2.5` (one GRID_2 column). It stays full width on phones.

---

## 4. SectionHeading

`size="lg"` is for top-level sections. `size="md"` is for headings inside panels and cards.

```tsx
<div className="flex flex-col gap-1">
  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
    <h3 className={`m-0 font-semibold text-brand-500 ${
      size === "lg" ? "text-base leading-6 md:text-lg md:leading-7" : "text-base leading-6"}`}>
      {title}{required && <span className="text-brand-600">*</span>}
    </h3>
    {children /* e.g. a checkbox; on phones it wraps under the title */}
  </div>
  {description && <p className="m-0 text-sm leading-5 text-gray-600">{description}</p>}
</div>
```

---

## 5. Field (label + control + hint)

```tsx
<div className={"flex flex-col gap-1.5 min-w-0 " + className}>
  <span className="flex gap-0.5 text-sm font-medium leading-5 text-gray-700">
    {label}{required && <span className="text-brand-600">*</span>}
  </span>
  {children}
  {hint && <p className="m-0 text-sm leading-5 text-gray-600">{hint}</p>}
</div>
```

---

## 6. Inputs, selects, date pickers, textarea

```css
.input-field  { @apply w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 shadow-xs placeholder:text-gray-500; }
.input-sm, .select-sm, .date-picker-sm { @apply h-8; }
```

```tsx
<textarea rows={3} className="input-field min-h-16 resize-y py-1.5" />
```

**Phone number** (country picker + input in one row):
```tsx
<div className="flex gap-1.5">
  <div className="select-trigger select-sm relative w-16 shrink-0">{/* flag + chevron + invisible native <select> */}</div>
  <div className="flex-1 min-w-0"><Input size="sm" type="tel" /></div>
</div>
```
`shrink-0` stops the country picker from shrinking, and `flex-1 min-w-0` lets the number input fill the rest of the row without overflowing.

---

## 7. Checkbox + Radio

```tsx
// CheckboxField / radio option label
<label className="relative flex items-center gap-2 cursor-pointer text-sm leading-5 text-gray-700">…</label>

// RadioGroup wrapper: wraps onto new lines on narrow screens
<div role="radiogroup" className="flex flex-wrap gap-x-5 gap-y-3">…</div>
```

- Radio dot: `h-4 w-4 shrink-0`.
- Inside a `Field`, give the RadioGroup `mt-1.5` so it has more space below the label than an input gets.
- To stack the options vertically, add `flex-col`.

> **Radio input bug to watch for:** if you hide the native radio with `sr-only`, put `relative` on its `<label>`.
> Otherwise the absolutely positioned input can escape the scroll container and stretch the page sideways on mobile.

---

## 8. Buttons

- Add buttons: `<Button size="md" className="w-fit">`. Don't make them full width.
- Icon buttons (trash, collapse): `flex h-8 w-8 items-center justify-center rounded-md` with a 20px icon.
