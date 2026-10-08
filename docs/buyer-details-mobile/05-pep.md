# Part 05: Political Exposure (PEP)

Requires [00-shared-foundation.md](00-shared-foundation.md). It also reuses **GroupPanel**, **EntryCard** and **ConfirmBox** from [03-co-buyer.md](03-co-buyer.md).
This part is a Yes/No question. Answering **Yes** shows the PEP group panel with one or more entries.

---

## 1. Yes/No question box

```tsx
<div className="flex flex-col gap-3">
  <SectionHeading
    title="Political Exposure Questionnaire"
    description="Have you or any of your immediate family members or close associates ever held an elected or appointed government position?"
  />
  <div className="flex flex-col gap-2 rounded-xl bg-gray-50 p-4 md:p-5">
    <p className="m-0 text-sm md:text-base font-medium leading-6 text-gray-700">
      Have you or any of your immediate family members or close associates ever held, or are currently
      holding, an elected or appointed government position in the Philippines or any other country?
    </p>
    <RadioGroup options={YES_NO} … />
  </div>
</div>
```

- Long question text is **`text-sm` on phones and `md:text-base` on desktop**. Keep `leading-6` so the paragraph is easy to read.
- The box uses `p-4 md:p-5` with no negative margin.

---

## 2. PEP group panel

```tsx
{isPep === "yes" && (
  <GroupPanel
    title="Politically Exposed Person (PEP) Details"
    action={<AddEntryButton label="Add new PEP" />}   // flex-wrap puts it under the title on phones
  >
    {pepEntries.map((e, i) => (
      <EntryCard key={e.id} title={`PEP Entry #${i + 1}`} onRemove={…}>
        <PepEntryFields />
      </EntryCard>
    ))}
    <AddEntryButton label="Additional PEP" />   {/* w-fit */}
    <ConfirmBox label="This is to certify that all information indicated above PEP questions are true and correct." />
  </GroupPanel>
)}
```

The shell, card and confirm box use the same spacing as the Co-Buyer part: `-mx-2 md:mx-0 px-2 py-4 md:p-5` for the panel and `px-2 md:px-5` for the card.

---

## 3. PepEntryFields

```tsx
<div className="flex flex-col gap-3">
  <SectionHeading title="Personal Details" size="md" />
  <div className={GRID_3}>{/* Prefix, First, Middle, Last, Suffix */}</div>
</div>

<div className="flex flex-col gap-3">
  <SectionHeading title="Government Position Details" size="md" />
  <SelectField label="Positions Is Or Was Held" required />
  <TextField label="Specific Government Position" required />

  <Field label="Time Period Held" required>
    <RadioGroup className="flex-col" options={[{ label: "Present" }, { label: "From and To" }]} … />
    {period === "range" && (
      <div className="mt-1.5 grid grid-cols-1 gap-x-5 gap-y-3 pl-6 sm:grid-cols-[206px_206px]">
        <DateField label="From" required />
        <DateField label="To" required />
      </div>
    )}
  </Field>

  <SelectField label="In what country was the position held?" required />
</div>

<div className="flex flex-col gap-3">
  <SectionHeading title="Your Connection & Funding Source" size="md" />
  <SelectWithOther label="Your Relationship to This Person" />
  <SelectWithOther label="Source of Funds for Property Acquisition" />
</div>
```

```tsx
// SelectWithOther: half width on desktop, full width on phones, textarea when "Other"
<div className="flex flex-col gap-1.5">
  <SelectField label={label} required className="md:w-1/2 md:pr-2.5" />
  {value === "Other" && (
    <>
      <TextArea placeholder="Please specify...." />
      <p className="m-0 text-sm leading-5 text-gray-600">Please specify the details it’s required.</p>
    </>
  )}
</div>
```

Points:
- Government Position fields are stacked full width (no grid), which keeps long labels readable on phones.
- The time-period radios are stacked (`flex-col`). The From/To dates are indented (`pl-6`) under the "From and To" option, stack on phones, and sit side by side at 206px each from `sm:` (640px) up.
- `md:w-1/2 md:pr-2.5` makes a single select the same width as one column of `GRID_2`.
