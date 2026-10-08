# Part 02: Spouse Information

Requires [00-shared-foundation.md](00-shared-foundation.md).
This block appears when Civil Status is **Married**, for the buyer and also for each co-buyer.

---

## 1. Collapsible gray shell

```tsx
<div className="-mx-2 md:mx-0 flex flex-col gap-6 rounded-xl bg-gray-50 px-2 py-4 md:p-5">
  <button type="button" aria-expanded={expanded} onClick={toggle}
    className="flex w-full cursor-pointer items-center justify-between border-0 bg-transparent p-0 text-left">
    <span className="text-base leading-6 md:text-lg md:leading-7 font-semibold text-brand-500">
      Spouse Information
    </span>
    <span className="flex h-8 w-8 items-center justify-center text-brand-700">
      {/* ChevronUp / ChevronDown, h-5 w-5 */}
    </span>
  </button>

  {expanded && (/* sections below */)}
</div>
```

- `-mx-2 md:mx-0` + `px-2 py-4 md:p-5`: on phones the panel extends 8px past the page padding, so the fields keep almost the full width.
- The whole header row is one button, so the tap target is the full width.

---

## 2. Inside the panel

Inside the panel, headings use `size="md"` (`text-base` everywhere). Sections are separated by the panel's `gap-6`, with **no Dividers**.

```tsx
<div className="flex flex-col gap-3">
  <SectionHeading title="Personal Details" size="md" />
  <div className={GRID_3}>{/* Prefix, First, Middle, Last, Suffix, DOB, Religion, Gender, Nationality, Citizenship */}</div>
</div>

{/* ID upload card: white on the gray panel */}
<div className="flex flex-col gap-4 rounded-2xl bg-white px-2 py-3 md:p-4">
  <h4 className="m-0 text-base font-semibold leading-6 text-gray-900">Spouse ID (Front Side)</h4>
  {/* upload panel */}
</div>

<div className="flex flex-col gap-3">
  <SectionHeading title="Birth Place Information" size="md" />
  <div className={GRID_3}>…</div>
</div>
<div className="flex flex-col gap-3">
  <SectionHeading title="Contact Information" size="md" />
  <div className={GRID_3}>…</div>
</div>

{/* Occupation (same as 01-buyer §5), but on gray */}
<OccupationFields subject="spouse" onGrayBackground />
```

---

## 3. Panels inside a gray panel

When the Occupation panels sit **inside** this gray spouse panel:
- Employer panel (`bg-brand-25`): **no** `-mx-2`. Keep `px-2 py-4 md:p-5`.
- Office address panel: switch `bg-gray-50` to **`bg-white`**, also with no `-mx-2`.

Only the outer panel extends outward. Nested panels stay inside it, otherwise they would extend past the gray edge.

---

## 4. Spouse inside a Co-Buyer card

When it appears inside a co-buyer entry card (white), add a `<Divider />` before the spouse block and between Contact and Occupation inside it.
