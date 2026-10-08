# Part 01: Buyer (main client)

Requires [00-shared-foundation.md](00-shared-foundation.md).
This part covers everything from the client type cards down to Source of Awareness.

Every section sits in the body column (`flex flex-col gap-6`) with a `<Divider />` between sections.

---

## 1. Client type (radio cards)

On phones the cards are stacked with a small gap and the "or" text is hidden. On desktop they sit side by side with "or" between them.

```tsx
<div role="radiogroup" aria-label="Client type"
     className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-stretch">
  {CLIENT_TYPES.map((type, index) => {
    const selected = clientType === type.value;
    return (
      <div key={type.value} className="contents">
        {index > 0 && (
          <p className="m-0 hidden md:block text-base text-gray-400 self-center">or</p>
        )}
        <button type="button" role="radio" aria-checked={selected}
          onClick={() => setClientType(type.value)}
          className={`flex-1 flex gap-3 items-start text-left border rounded-xl p-3 md:p-4 cursor-pointer transition-colors ${
            selected ? "bg-brand-25 border-brand-500" : "bg-white border-gray-300 hover:bg-gray-50"}`}>
          <span className={`w-5 h-5 rounded-full mt-0.5 flex items-center justify-center border shrink-0 ${
            selected ? "bg-brand-600 border-brand-600" : "bg-white border-gray-300"}`}>
            {selected && <span className="w-2 h-2 bg-white rounded-full" />}
          </span>
          <span className="flex flex-col gap-1">
            <span className="text-base font-medium leading-6">{type.title}</span>
            <span className="text-xs leading-[18px]">{type.description}</span>
          </span>
        </button>
      </div>
    );
  })}
</div>
```

- `p-3` on phones vs `md:p-4` on desktop.
- The radio dot uses `mt-0.5 shrink-0` so it lines up with the first line of the title.
- `className="contents"` on the wrapper keeps the button and the "or" as direct flex children.

---

## 2. Personal Details / Birth Place / Contact

The same pattern repeats: a heading and a `GRID_3`. You get one column on phones and three on desktop.

```tsx
<div className="flex flex-col gap-3">
  <SectionHeading title="Personal Details" />
  <div className={GRID_3}>
    {/* Prefix, First, Middle, Last, Suffix, DOB, Religion, Civil Status, Nationality, Citizenship, Gender */}
  </div>
</div>
<Divider />
<div className="flex flex-col gap-3">
  <SectionHeading title="Birth Place Information" />
  <div className={GRID_3}>{/* Country, State/Province, City/Municipality */}</div>
</div>
<Divider />
<div className="flex flex-col gap-3">
  <SectionHeading title="Contact Information" />
  <div className={GRID_3}>{/* Email 1, Email 2, Mobile 1, Mobile 2, Landline (phone field from 00 §6) */}</div>
</div>
```

**Middle name** with a "No Middle Name" checkbox: put the checkbox *inside* the Field, under the input.
```tsx
<Field label="Middle Name">
  <Input size="sm" disabled={noMiddleName} />
  <CheckboxField label="No Middle Name" className="mt-0.5" … />
</Field>
```

**Nationality hint:** pass it as the Field `hint` (`text-sm leading-5`), so it sits under the select.

---

## 3. Present Address + Home Address

```tsx
<div className="flex flex-col gap-3">
  <SectionHeading title="Present Address" />
  <AddressFields />
</div>
<Divider />
<div className="flex flex-col gap-3">
  <SectionHeading title="Home Address">
    <CheckboxField label="Same as present address" … />   {/* wraps under title on phones */}
  </SectionHeading>
  <AddressFields disabled={sameAsPresent} />
</div>
```

```tsx
// AddressFields
<div className={GRID_3}>
  <SelectField label="Country" />
  <TextField label="State/Province" />
  <TextField label="City/Municipality" />
  <TextField label="Barangay" />
  <TextField label="House No./Building/Street" className="md:col-span-2" />
  <TextField label="Zip Code" />
</div>
```

---

## 4. Home Ownership

```tsx
<div className="flex flex-col gap-3">
  <SectionHeading title="Home Ownership" />
  <div className={GRID_3}>
    <SelectField label="Ownership Category" required … />
    <TextField label="Length of Stay (In year)" type="number" min={0} … />
  </div>
</div>
```

---

## 5. Occupation (nested tinted panels)

Tinted panels inside the white card **extend 8px outward on phones**, so the fields inside keep almost the full width.

```tsx
<div className="flex flex-col gap-6">
  <SectionHeading title="Occupation Information" description="Identify the client's employment status or profession." />
  <div className={GRID_2}>
    <SelectField label="Selected Occupation" hint="This selection will determine…" />
    <TextField label="Tax Identification Number" />
  </div>

  {/* Only for working occupations */}
  <div className="-mx-2 md:mx-0 flex flex-col gap-5 rounded-xl border border-brand-100 bg-brand-25 px-2 py-4 md:p-5">
    <SectionHeading title="Business and Employment Information." size="md" description="…" />
    <div className={GRID_2}>{/* 9 employer fields */}</div>
  </div>

  <div className="-mx-2 md:mx-0 flex flex-col gap-5 rounded-xl border border-gray-100 bg-gray-50 px-2 py-4 md:p-5">
    <SectionHeading title="Office Address Information" size="md" />
    <div className={GRID_3}>
      {/* Country, State, City, Barangay, No./Floor/Room */}
      <div className="hidden md:block" />                              {/* desktop-only spacer */}
      <TextField label="House No./Building/Street" className="md:col-span-2" />
      <TextField label="Zip Code" />
      <PhoneField label="Office Contact Number" />
    </div>
  </div>
</div>
```

**Why `-mx-2` + `px-2`:** the page already has 16px side padding. Adding another 20px of panel padding leaves fields too narrow on a 360px phone.
Pulling the panel out 8px and padding it 8px keeps the panel edge visible while the fields stay as wide as the fields outside the panel.

---

## 6. Preferred Mailing Address

```tsx
<div className="flex flex-col gap-5">
  <div className="flex flex-col gap-3">
    <SectionHeading title="Preferred Mailing Address" />
    <p className="m-0 rounded-lg border border-gray-100 bg-gray-50 px-4 py-2 text-sm leading-5 text-gray-700">
      <span className="font-semibold text-error-600">Note:</span> …
    </p>
  </div>

  <Field label="Preferred Mailing Address Source" required>
    <RadioGroup className="mt-1.5" … />   {/* Primary Buyer, Co-buyer 1, Co-buyer 2… wraps on phones */}
  </Field>

  <div className={GRID_2}>
    <Field label="Preferred Mailing Address" required>
      <RadioGroup className="mt-1.5 max-w-[320px] gap-x-11" … />   {/* long labels: cap width */}
    </Field>
    <Field label="Preferred Mailing Method" required>
      <RadioGroup className="mt-1.5" … />
    </Field>
  </div>

  <Field label="Special Mailing instruction"><TextArea placeholder="Write instructions..." /></Field>
</div>
```

---

## 7. Reason For Buying (multi-select chips)

```tsx
<div className="flex flex-col gap-5">
  <SectionHeading title="Reason For Buying" required description="Select all that apply" />
  <div className="flex flex-col gap-3">
    <MultiSelect … />
    {reasons.includes("Other") && <Field label="Please specify the “other” reason" required><TextArea /></Field>}
  </div>
</div>
```

- Trigger: `flex min-h-8 w-full items-center gap-2 rounded-lg border px-3 py-1`. Use **`min-h-8`, not `h-8`**, so the trigger grows when chips wrap onto a second line.
- Chip area: `flex flex-1 flex-wrap gap-2`.
- Chip: `inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium leading-[18px]`.

---

## 8. Source Of Awareness (checkbox grid + "specify" inputs)

2 columns on phones, 4 on desktop. Each row's "specify" input appears on phones **only after its option is ticked**. On desktop it always stays in place, disabled until ticked.

```tsx
<div className="flex flex-col gap-5">
  <div className="flex flex-col gap-1">
    <SectionHeading title="Source Of Awareness" />
    <p className="m-0 flex gap-0.5 text-sm leading-5 text-gray-600">
      How did you learn about the property?<span className="text-brand-600">*</span>
    </p>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-5 gap-y-1 md:gap-y-2 items-center">
    {AWARENESS_SOURCES.map((row, rowIndex) => (
      <div key={rowIndex} className="contents">
        {row.map((source) => (
          <CheckboxField key={source} label={source} className="py-1.5 md:py-3 font-medium" … />
        ))}
        <div className={"col-span-2 md:col-span-1 mb-1 md:mb-0 " +
          (awareness.includes(row[row.length - 1]) ? "" : "hidden md:block")}>
          {awarenessDetail[rowIndex] /* Input / Select, disabled until its option is ticked */}
        </div>
      </div>
    ))}
  </div>
</div>
```

- Checkbox rows use `py-1.5` on phones (tighter, but still easy to tap) and `md:py-3` on desktop.
- The "specify" input spans both phone columns (`col-span-2`) so it gets the full width.

---

## Section order in the body

Client type → Personal Details → Birth Place → Contact → Present/Home Address → Home Ownership → Occupation → Mailing → Reason → Awareness → *Spouse (if Married, [02](02-spouse.md))* → Co-Buyer ([03](03-co-buyer.md)) → Representative ([04](04-representative.md)) → PEP ([05](05-pep.md)).
