# Part 06: Input components

Requires [00-shared-foundation.md](00-shared-foundation.md) for the spacing and type scale.
This file defines **every form control** the Buyer Details form uses: what it looks like, its sizes and states, the CSS, and the React code.
If you build these once and use them everywhere, every field in the form has the same height, text size, radius and colours on phone and desktop.

Taken from `selfie-capture-id/src/{Input,Select,DatePicker,Checkbox}.tsx`, `BuyerDetailsStep.tsx` and `tailwind.css`.

---

## 1. Design tokens

```ts
// tailwind.config.ts → theme.extend
colors: {
  brand: { 25: "#F0F5FF", 50: "#d4e1fc", 100: "#d9e6ff", 200: "#b3ccff", 300: "#4c69f0",
           400: "#0a4de0", 500: "#07389d", 600: "#06318a", 700: "#052b78", 800: "#011e7e", 900: "#010f4f" },
  primary: { /* same values as brand: alias used by the control CSS */ },
  gray: { 50: "#f9fafb", 100: "#f3f4f6", 200: "#e5e7eb", 300: "#d1d5db", 400: "#9ca3af",
          500: "#6b7280", 600: "#4b5563", 700: "#374151", 900: "#111827" },
},
boxShadow: {
  xs: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
},
```

## 2. Sizes and states at a glance

| Control | Height | Text | Radius | Padding | Placeholder |
|---|---|---|---|---|---|
| Input / Select / DatePicker (`sm`, **used in the form**) | `h-8` (32px) | `text-sm` (14px) | `rounded-lg` | `px-3` | `gray-500` |
| Input / Select / DatePicker (`md`) | `h-10` (40px) | `text-sm` | `rounded-lg` | `px-3` | `gray-500` |
| TextArea | `min-h-16`, 3 rows, resizable | `text-sm` | `rounded-lg` | `px-3 py-1.5` | `gray-500` |
| MultiSelect | `min-h-8` (grows with chips) | `text-sm`, chips `text-xs` | `rounded-lg` | `px-3 py-1` | `gray-400` |
| Checkbox (`sm`) | 16×16 | label `text-sm leading-5` | `rounded-sm` | n/a | n/a |
| Radio | 16×16 dot | label `text-sm leading-5` | full | n/a | n/a |

| State | Look |
|---|---|
| Default | white fill, `border-gray-300`, `shadow-xs` |
| Focus | Input: `ring-1 ring-primary-500`. Select/Date: `border-primary-500` |
| Open (select/date) | `border-primary-500`, chevron flips up |
| Filled | `text-gray-900`; text inputs show a small × clear button |
| Disabled | `bg-gray-50 text-gray-500`, `cursor-not-allowed` |

**Mobile rule:** use the same `h-8 text-sm` on every screen size. Don't scale controls with `md:`; only the layout around them changes.
Every control is `w-full`, so its width always comes from the grid cell. That's why the Field wrapper needs `min-w-0`.

> **iOS zoom note:** Safari zooms in when a focused input's font is under 16px. If the other codebase gets that zoom on iPhone, add
> `text-base md:text-sm` to `.input-field` / `.select-trigger` / `.date-picker-trigger` (or `maximum-scale=1` in the viewport meta tag).
> The source form keeps `text-sm` to match the Figma design.

---

## 3. CSS (`@layer components`)

```css
@layer components {
  /* ---------- Text input ---------- */
  .input-field {
    @apply w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 shadow-xs
           placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors;
  }
  .input-field:disabled { @apply cursor-not-allowed bg-gray-50 text-gray-500; }
  .input-sm { @apply h-8; }
  .input-md { @apply h-10; }

  /* ---------- Select trigger + panel ---------- */
  .select-trigger {
    @apply flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white px-3
           text-sm text-gray-900 shadow-xs focus:outline-none focus-visible:border-primary-500
           disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400;
  }
  .select-trigger-open { @apply border-primary-500; }
  .select-sm { @apply h-8; }
  .select-md { @apply h-10; }
  .select-panel       { @apply absolute top-full mt-1 z-50 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg; }
  .select-clear-row   { @apply flex justify-end px-4 py-1.5; }
  .select-clear-button{ @apply cursor-pointer text-sm font-semibold text-primary-500 hover:text-primary-700; }
  .select-option-list { @apply flex max-h-60 flex-col overflow-y-auto; }
  .select-option      { @apply flex w-full cursor-pointer items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50; }
  .select-option-selected { @apply bg-primary-25 font-semibold text-primary-500 hover:bg-primary-25; }

  /* ---------- Date picker ---------- */
  .date-picker-trigger {
    @apply flex w-full cursor-pointer flex-row-reverse items-center justify-end gap-2 rounded-lg border border-gray-300 bg-white px-3
           text-sm text-gray-900 shadow-xs focus:outline-none focus-visible:border-primary-500
           disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400;   /* calendar icon first */
  }
  .date-picker-trigger-open { @apply border-primary-500; }
  .date-picker-sm { @apply h-8; }
  .date-picker-md { @apply h-10; }
  .date-picker-panel      { @apply absolute z-20 mt-1 w-[280px] max-w-[calc(100vw-2rem)] rounded-lg border border-gray-200 bg-white pb-3 shadow-lg; }
  .date-picker-nav-button { @apply flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-700; }
  .date-picker-select     { @apply h-8 flex-1 cursor-pointer rounded-md border border-gray-300 bg-white px-2 text-xs font-medium text-gray-700 focus:outline-none focus-visible:border-primary-500; }
  .date-picker-grid       { @apply mt-3 grid grid-cols-7 gap-y-1 border-t border-gray-100 px-3 pt-2; }
  .date-picker-weekday    { @apply flex h-7 items-center justify-center text-xs font-semibold text-gray-400; }
  .date-picker-day        { @apply flex h-7 w-7 cursor-pointer items-center justify-center justify-self-center rounded-full text-sm text-gray-900 hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent; }
  .date-picker-day-outside  { @apply text-primary-300; }
  .date-picker-day-today    { @apply border border-primary-300 font-semibold text-primary-500; }
  .date-picker-day-selected { @apply bg-primary-600 font-semibold text-white hover:bg-primary-600; }
  .date-picker-footer       { @apply mt-2 flex items-center justify-between border-t border-gray-100 px-3 pt-2; }
  .date-picker-footer-button{ @apply cursor-pointer rounded-md px-2 py-1 text-xs font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-700; }
  .date-picker-footer-button-primary { @apply text-primary-500 hover:text-primary-700; }

  /* ---------- Checkbox (custom drawn) ---------- */
  .checkbox-field {
    @apply relative m-0 shrink-0 cursor-pointer appearance-none border border-gray-300 bg-white bg-center bg-no-repeat transition-colors;
    @apply focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white;
    @apply disabled:cursor-not-allowed disabled:bg-gray-50;
    background-size: 62% auto;
  }
  .checkbox-field:checked, .checkbox-field:indeterminate { @apply border-transparent bg-primary-600; }
  .checkbox-field:checked {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8' viewBox='0 0 10 8' fill='none'%3E%3Cpath d='M8.8333 0.833496L3.3333 6.3335L0.8333 3.8335' stroke='white' stroke-width='1.6666' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  }
  .checkbox-field:indeterminate {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round'%3E%3Cline x1='5' y1='12' x2='19' y2='12'/%3E%3C/svg%3E");
  }
  .checkbox-field:disabled:not(:checked):not(:indeterminate) { @apply border-gray-300 bg-gray-50; }
  .checkbox-field:disabled:checked, .checkbox-field:disabled:indeterminate { @apply border-gray-300 bg-gray-100; }
  .checkbox-sm { @apply h-4 w-4 rounded-sm; }
  .checkbox-md { @apply h-5 w-5 rounded-md; }
}
```

> In the source repo the white fill, `rounded-lg` and `shadow-xs` come from a `.form-lg` wrapper class on the form root, while the admin screens keep a compact gray style.
> If the other codebase only has this one form style, use the merged rules above as they are.
> I added `max-w-[calc(100vw-2rem)]` to the date panel so its 280px panel can't overflow a narrow screen; it isn't in the source repo.

---

## 4. Field wrapper (label + control + hint)

Every control on the form goes inside this wrapper.

```tsx
function Field({ label, required = false, hint, className = "", children }: {
  label: string; required?: boolean; hint?: string; className?: string; children: ReactNode;
}) {
  return (
    <div className={"flex flex-col gap-1.5 min-w-0 " + className}>
      <span className="flex gap-0.5 text-sm font-medium leading-5 text-gray-700">
        {label}{required && <span className="text-brand-600">*</span>}
      </span>
      {children}
      {hint && <p className="m-0 text-sm leading-5 text-gray-600">{hint}</p>}
    </div>
  );
}

// Convenience wrappers
const TextField   = ({ label, required, hint, className, ...p }) =>
  <Field {...{ label, required, hint, className }}><Input size="sm" aria-label={label} {...p} /></Field>;
const SelectField = ({ label, required, hint, className, ...p }) =>
  <Field {...{ label, required, hint, className }}><Select size="sm" aria-label={label} {...p} /></Field>;
const DateField   = ({ label, required }) =>
  <Field {...{ label, required }}><DatePicker size="sm" aria-label={label} placeholder="MM/DD/YYYY" /></Field>;
```

- Label → control gap: `gap-1.5` (6px). The required star is `text-brand-600` with `gap-0.5`.
- `min-w-0` is required. Without it, a long value pushes the grid wider than the screen.

---

## 5. Input (text, email, number, tel)

```tsx
export type InputSize = "sm" | "md";
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  clearable?: boolean;
}
const INPUT_SIZE_CLASSES: Record<InputSize, string> = { sm: "input-sm", md: "input-md" };

export default function Input({ size = "sm", className = "", clearable, type = "text",
  value, defaultValue, onChange, ...rest }: InputProps) {
  const isClearable = clearable ?? (type === "text" && !rest.readOnly && !rest.disabled);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");

  if (!isClearable) {
    return <input type={type} value={value} defaultValue={defaultValue} onChange={onChange}
      className={"input-field " + INPUT_SIZE_CLASSES[size] + (className ? " " + className : "")} {...rest} />;
  }

  const currentValue = value ?? internalValue;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => { setInternalValue(e.target.value); onChange?.(e); };
  const handleClear = () => {
    setInternalValue("");
    onChange?.({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className={"relative " + className}>
      <input type={type} value={currentValue} onChange={handleChange}
        className={"input-field pr-8 " + INPUT_SIZE_CLASSES[size]} {...rest} />
      {currentValue !== "" && (
        <button type="button" aria-label="Clear" onClick={handleClear}
          className="absolute right-2 top-1/2 flex h-4 w-4 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600">
          <XIcon className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
```

- Text inputs get an × clear button once they have a value. `pr-8` keeps typed text from running under it.
- Number fields: `type="number" min={0}`. Email: `type="email"`. Phone: `type="tel"`. Each type opens the matching keyboard on phones.

---

## 6. Select (custom dropdown)

This is a custom component rather than a native `<select>`, because the design needs a highlighted selected row and a "Clear" action in the panel.

```tsx
export interface SelectOption { value: string; label: string; }

export default function Select({ options, size = "sm", placeholder = "Select one", value, defaultValue,
  onChange, disabled = false, className = "", "aria-label": ariaLabel }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedValue = value ?? internalValue;
  const selectedOption = options.find((o) => o.value === selectedValue);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (!containerRef.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const pick = (v: string) => { setInternalValue(v); onChange?.(v); setOpen(false); };

  return (
    <div ref={containerRef} className={"relative " + className}>
      <button type="button" disabled={disabled} aria-haspopup="listbox" aria-expanded={open} aria-label={ariaLabel}
        onClick={() => setOpen((v) => !v)}
        className={"select-trigger " + (size === "sm" ? "select-sm" : "select-md") + (open ? " select-trigger-open" : "")}>
        <span className={"truncate " + (selectedOption ? "text-gray-900" : "text-gray-500")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        {open ? <ChevronUpIcon className="h-4 w-4 shrink-0 text-gray-500" />
              : <ChevronDownIcon className="h-4 w-4 shrink-0 text-gray-500" />}
      </button>

      {open && (
        <div className="select-panel" role="listbox">
          {selectedOption && (
            <div className="select-clear-row">
              <button type="button" className="select-clear-button" onClick={() => { setInternalValue(""); onChange?.(""); }}>Clear</button>
            </div>
          )}
          <div className="select-option-list">
            {options.map((o) => (
              <button key={o.value} type="button" role="option" aria-selected={o.value === selectedValue}
                onClick={() => pick(o.value)}
                className={"select-option " + (o.value === selectedValue ? "select-option-selected" : "")}>
                {o.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

Mobile points:
- `truncate` on the label plus `shrink-0` on the chevron: a long selected value gets an ellipsis instead of pushing the chevron out.
- The panel is `w-full` of its trigger and capped at `max-h-60` with its own scroll, so long lists like countries don't run off the screen.
- Option rows are `py-2` (about 36px tall), which is comfortable to tap.

---

## 7. DatePicker

The trigger works like Select, with the calendar icon placed **before** the text. The value is an ISO `yyyy-mm-dd` string, and the trigger shows `MM/DD/YYYY`.

```tsx
<div ref={containerRef} className={"relative " + className}>
  <button type="button" disabled={disabled} aria-haspopup="dialog" aria-expanded={open} aria-label={ariaLabel}
    onClick={() => setOpen((v) => !v)}
    className={"date-picker-trigger date-picker-sm" + (open ? " date-picker-trigger-open" : "")}>
    <span className={"truncate " + (selectedDate ? "text-gray-900" : "text-gray-500")}>
      {selectedDate ? formatDisplay(selectedDate) : placeholder /* "MM/DD/YYYY" */}
    </span>
    <CalendarIcon className="h-4 w-4 shrink-0 text-gray-400" />
  </button>

  {open && (
    <div className="date-picker-panel" role="dialog">
      {/* Header: ‹  October 2026  › */}
      <div className="flex items-center justify-between px-3 pt-3">
        <button className="date-picker-nav-button" aria-label="Previous month">‹</button>
        <span className="text-sm font-semibold text-gray-900">{MONTH} {YEAR}</span>
        <button className="date-picker-nav-button" aria-label="Next month">›</button>
      </div>
      {/* Quick-jump: Month + Year native selects */}
      <div className="flex items-center gap-2 px-3 pt-2">
        <select className="date-picker-select" aria-label="Month">…</select>
        <select className="date-picker-select" aria-label="Year">…</select>
      </div>
      {/* 7×6 grid starting on the Sunday on/before the 1st */}
      <div className="date-picker-grid">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => <span key={d} className="date-picker-weekday">{d}</span>)}
        {grid.map((date) => (
          <button key={date.toISOString()} type="button" disabled={outsideMinMax(date)} onClick={() => commit(date)}
            className={"date-picker-day"
              + (!inMonth(date) ? " date-picker-day-outside" : "")
              + (isToday(date) && !isSelected(date) ? " date-picker-day-today" : "")
              + (isSelected(date) ? " date-picker-day-selected" : "")}>
            {date.getDate()}
          </button>
        ))}
      </div>
      <div className="date-picker-footer">
        <button className="date-picker-footer-button" onClick={clear}>Clear</button>
        <button className="date-picker-footer-button date-picker-footer-button-primary" onClick={() => commit(today)}>Today</button>
      </div>
    </div>
  )}
</div>
```

```ts
const toISO = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const formatDisplay = (d: Date) => `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}/${d.getFullYear()}`;
function buildMonthGrid(year: number, month: number): Date[] {
  const start = new Date(year, month, 1 - new Date(year, month, 1).getDay());
  return Array.from({ length: 42 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
}
```

- Use the same outside-click and Escape close logic as Select. When the panel opens, show the selected month (or today's month).
- For a **Date of Birth** field, widen the year range: the source repo offers today ±10 years, which doesn't reach most birth years.

---

## 8. TextArea

```tsx
<textarea rows={3} className="input-field min-h-16 resize-y py-1.5" aria-label="…" placeholder="Write instructions..." />
```

The label comes from the surrounding `Field`. Use `resize-y` only, because sideways resizing would overflow a phone screen.

---

## 9. Phone field (country code + number)

```tsx
<Field label={label} required={required}>
  <div className="flex gap-1.5">
    {/* Native <select> sits invisibly over the flag so the phone's own picker opens */}
    <div className="select-trigger select-sm relative w-16 shrink-0 focus-within:border-primary-500">
      {country.code === "PH" ? <PhilippinesFlag /> : <span className="text-xs font-semibold text-gray-700">{country.code}</span>}
      <ChevronDownIcon className="pointer-events-none h-4 w-4 shrink-0 text-gray-500" />
      <select aria-label={label + " country code"} value={countryCode} onChange={(e) => setCountryCode(e.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0">
        {PHONE_COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.code} {c.dial}</option>)}
      </select>
    </div>
    <div className="flex-1 min-w-0">
      <Input size="sm" type="tel" aria-label={label} placeholder={country.placeholder} />
    </div>
  </div>
</Field>
```

- The country box is fixed at `w-16 shrink-0`, and the number input takes the rest of the row (`flex-1 min-w-0`).
- The country picker is a native `<select>` underneath, so on phones it opens the system picker.

---

## 10. Checkbox + CheckboxField

```tsx
export default function Checkbox({ size = "sm", className = "", indeterminate = false, ...rest }: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { if (ref.current) ref.current.indeterminate = indeterminate; }, [indeterminate]);
  return <input ref={ref} type="checkbox"
    className={"checkbox-field " + (size === "sm" ? "checkbox-sm" : "checkbox-md") + (className ? " " + className : "")} {...rest} />;
}

// With label: the whole row is clickable
function CheckboxField({ label, className = "", ...props }) {
  return (
    <label className={"flex items-center gap-2 cursor-pointer text-sm leading-5 text-gray-700 " + className}>
      <Checkbox {...props} />
      <span>{label}</span>
    </label>
  );
}
```

Typical extra classes:
- Under an input ("No Middle Name"): `mt-0.5`
- In a checkbox grid ("Source of Awareness"): `py-1.5 md:py-3 font-medium`. The padding makes the tap area bigger on phones.
- In a confirm box: wrap it in `rounded-xl border border-brand-100 bg-white px-4 py-3.5`.

---

## 11. RadioGroup

```tsx
function RadioGroup({ label, options, value, onChange, className = "" }: {
  label: string; options: SelectOption[]; value: string; onChange: (v: string) => void; className?: string;
}) {
  const name = useId();
  return (
    <div role="radiogroup" aria-label={label} className={"flex flex-wrap gap-x-5 gap-y-3 " + className}>
      {options.map((o) => (
        // `relative` keeps the sr-only input anchored here, so it can't stretch the page sideways on mobile
        <label key={o.value} className="relative flex items-center gap-2 cursor-pointer text-sm leading-5 text-gray-700">
          <input type="radio" name={name} className="peer sr-only"
            checked={value === o.value} onChange={() => onChange(o.value)} />
          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white transition-colors
                           peer-checked:border-brand-600 peer-checked:bg-brand-600
                           peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500 peer-focus-visible:ring-offset-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          {o.label}
        </label>
      ))}
    </div>
  );
}
```

- `flex-wrap gap-x-5 gap-y-3`: the options wrap onto new rows on narrow screens.
- Inside a `Field`, add `className="mt-1.5"`. Add `flex-col` to stack the options vertically, or `max-w-[320px] gap-x-11` for long labels.

---

## 12. MultiSelect (checkbox dropdown with chips)

```tsx
<div ref={containerRef} className="relative">
  <div role="combobox" aria-label={label} aria-expanded={open} tabIndex={0}
    onClick={() => setOpen((o) => !o)}
    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen((o) => !o); } }}
    className={`flex min-h-8 w-full cursor-pointer items-center gap-2 rounded-lg border bg-white px-3 py-1 focus:outline-none focus-visible:border-primary-500 ${
      open ? "border-primary-500" : "border-gray-300"}`}>
    <div className="flex flex-1 flex-wrap gap-2">
      {value.length === 0 && <span className="text-sm text-gray-400">{placeholder /* "Select all that apply" */}</span>}
      {value.map((v) => (
        <span key={v} className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-0.5 text-xs font-medium leading-[18px] text-gray-700">
          {labelFor(v)}
          <button type="button" aria-label={"Remove " + v} onClick={(e) => { e.stopPropagation(); toggle(v); }}
            className="flex h-3.5 w-3.5 items-center justify-center rounded text-gray-400 hover:text-gray-600">
            <XIcon className="h-2.5 w-2.5" />
          </button>
        </span>
      ))}
    </div>
    {open ? <ChevronUpIcon className="h-4 w-4 shrink-0 text-gray-500" /> : <ChevronDownIcon className="h-4 w-4 shrink-0 text-gray-500" />}
  </div>

  {open && (
    <div className="select-panel" role="listbox" aria-multiselectable="true">
      <div className="select-option-list">
        {options.map((o) => (
          <label key={o.value} className="select-option gap-2">
            <Checkbox checked={value.includes(o.value)} onChange={() => toggle(o.value)} />
            {o.label}
          </label>
        ))}
      </div>
    </div>
  )}
</div>
```

- Use **`min-h-8`, not `h-8`**, so the box grows when chips wrap onto a second line on phones.
- Use `e.stopPropagation()` on the chip × so removing a chip doesn't also open the panel.
- The panel reuses the Select panel classes, so both dropdowns look the same.

---

## Checklist

- [ ] Inputs, selects, date pickers and the phone field are the same height (`h-8`) side by side.
- [ ] Every control is `w-full`, and its Field wrapper has `min-w-0`.
- [ ] Placeholders are `gray-500` and filled values are `gray-900` on every control.
- [ ] Disabled looks the same everywhere: `bg-gray-50 text-gray-500` with a not-allowed cursor.
- [ ] Long selected values get an ellipsis (`truncate`), and icons keep their size (`shrink-0`).
- [ ] Dropdown and date panels stay inside a 360px-wide screen.
- [ ] Each radio's `<label>` is `relative`, and the page has no sideways scroll.
- [ ] Every control has an `aria-label` or a visible label.
