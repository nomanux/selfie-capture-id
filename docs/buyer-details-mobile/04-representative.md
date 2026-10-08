# Part 04: Representative Information

Requires [00-shared-foundation.md](00-shared-foundation.md).
This part is a Yes/No question. Answering **Yes** shows the Representative Details panel.

---

## 1. Yes/No question box

```tsx
<div className="flex flex-col gap-3">
  <SectionHeading
    title="Representative Information"
    description="Please provide details if you have an Attorney-in-Fact or Financer involved in this transaction."
  />
  <div className="flex flex-col gap-2 rounded-xl bg-gray-50 p-4 md:p-5">
    <p className="m-0 text-sm font-medium leading-6 text-gray-700">
      Do you have an Attorney-in-Fact / a Financer?
    </p>
    <RadioGroup options={[{ label: "No", value: "no" }, { label: "Yes", value: "yes" }]} … />
  </div>
</div>
{hasRepresentative === "yes" && <RepresentativeDetails />}
<Divider />
```

- This plain question box uses `p-4 md:p-5` with **no** negative margin, because it only holds a short question and the radio buttons.

---

## 2. Representative Details panel

A bordered gray panel split into two areas with a line between them.

```tsx
<div className="flex flex-col gap-3">
  <SectionHeading title="Representative Details" />

  <div className="-mx-2 md:mx-0 rounded-xl border border-gray-200 bg-gray-50">
    {/* Top: type selector */}
    <div className="px-2 py-4 md:p-5 md:pr-0">
      <SelectField label="Type of Representative" required className="md:w-[338px]" />
    </div>

    {/* Bottom: details */}
    <div className="flex flex-col gap-6 border-t border-gray-200 px-2 py-4 md:p-5">
      <div className="flex flex-col gap-3">
        <SectionHeading title="Personal Details" size="md" />
        <div className={GRID_3}>{/* names, DOB, Religion, Nationality, Civil Status (optional), Gender (optional) */}</div>
      </div>
      <div className="flex flex-col gap-3">
        <SectionHeading title="Birth Place Information" size="md" />
        <div className={GRID_3}>…</div>
      </div>
      <PresentAndHomeAddress headingSize="md" />   {/* no Divider between them at md size */}
      <div className="flex flex-col gap-3">
        <SectionHeading title="Contact Information" size="md" />
        <div className={GRID_3}>…</div>
      </div>
      <div className="flex flex-col gap-3">
        <SectionHeading title="Relationship with Buyer" size="md" />
        <SelectField label="Name of Relationship" required className="md:w-1/3 md:pr-3.5" />
        {relationship === "Other" && <TextArea placeholder="Please specify...." />}
      </div>
    </div>
  </div>
</div>
```

Points:
- On phones the panel extends 8px outward (`-mx-2`) and has 8px padding inside (`px-2 py-4`), the same as the co-buyer panel.
- **Fixed widths only from `md:` up** (`md:w-[338px]`, `md:w-1/3`). On phones the selects fill the width.
- `md:w-1/3 md:pr-3.5` makes a single select the same width as one column of the `GRID_3` fields above it.
- The headings inside the panel are `size="md"`, and sections are separated by `gap-6` without Dividers.
