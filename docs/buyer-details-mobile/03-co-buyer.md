# Part 03: Co-Buyer Information

Requires [00-shared-foundation.md](00-shared-foundation.md).
The structure is: gray **GroupPanel**, then one white **EntryCard** per co-buyer, then the **Add button**, then a **ConfirmBox**.

---

## 1. GroupPanel (gray shell)

```tsx
<div className="-mx-2 md:mx-0 flex flex-col gap-6 rounded-xl bg-gray-50 px-2 py-4 md:p-5">
  <div className="flex flex-wrap items-center justify-between gap-3">
    <div className="flex items-center gap-3">
      <img src={usersIcon} alt="" width={24} height={24} />
      <h3 className="m-0 text-base leading-6 md:text-lg md:leading-7 font-semibold text-brand-500">
        Co-Buyer Information (Optional)
      </h3>
    </div>
    {action /* optional header button; flex-wrap drops it below the title on phones */}
  </div>

  {coBuyers.map((c, i) => <EntryCard key={c.id} title={`Co-Buyer #${i + 1}`} …><CoBuyerFields index={i + 1} /></EntryCard>)}

  <Button variant="primary" size="md" className="w-fit">
    <img src={plusIcon} width={20} height={20} alt="" />
    {coBuyers.length > 0 ? "Additional Co-buyer" : "Add Co-buyer"}
  </Button>

  {coBuyers.length > 0 && (
    <div className="rounded-xl border border-brand-100 bg-white px-4 py-3.5">
      <CheckboxField label="I confirm that all co-buyer details provided are accurate." />
    </div>
  )}
</div>
```

---

## 2. EntryCard (Co-Buyer #1, #2 …)

```tsx
<div className="rounded-xl border border-gray-200 bg-white px-2 md:px-5">
  <div className={`flex items-center justify-between gap-4 py-5 ${expanded ? "border-b border-gray-200" : ""}`}>
    <h4 className="m-0 text-base font-semibold leading-6 text-brand-500">{title}</h4>
    <div className="flex items-center gap-6">
      <button aria-label={"Remove " + title}
        className="flex h-8 w-8 items-center justify-center rounded-md border-0 bg-transparent hover:bg-error-50">
        {/* trash 20px */}
      </button>
      <button aria-label={(expanded ? "Collapse " : "Expand ") + title} aria-expanded={expanded}
        className="flex h-8 w-8 items-center justify-center rounded-md border-0 bg-transparent text-brand-700 hover:bg-gray-50">
        {/* chevron h-5 w-5 */}
      </button>
    </div>
  </div>
  {expanded && <div className="flex flex-col gap-6 py-5">{children}</div>}
</div>
```

- The card is already inside the gray panel, so it only needs **`px-2` on phones** (`md:px-5` on desktop).
- Use stable ids for entries, not the array index, so removing #1 doesn't move typed values into #2.

---

## 3. CoBuyerFields (inside the card)

Headings are `size="md"`. Sections are separated by the card's `gap-6`.

```tsx
<div className="flex flex-col gap-3">
  <SectionHeading title="Personal Details" size="md" />
  <div className={GRID_3}>{/* names, DOB, Religion, Nationality, Citizenship, Civil Status (optional), Gender (optional) */}</div>
</div>

{/* ID upload: gray card on the white entry card */}
<div className="flex flex-col gap-4 rounded-2xl bg-gray-50 px-2 py-3 md:p-4">
  <h4 className="m-0 text-base font-semibold leading-6 text-gray-900">Co-Buyer #1 ID (Front Side)</h4>
  {/* compact upload only */}
</div>

{idUploaded && <CoBuyerSelfie />}   {/* §4 */}

<div className="flex flex-col gap-3"><SectionHeading title="Birth Place Information" size="md" /><div className={GRID_3}>…</div></div>
<div className="flex flex-col gap-3"><SectionHeading title="Contact Information" size="md" /><div className={GRID_3}>…</div></div>

{/* Present + Home address with size="md" headings, NO divider between them */}
<PresentAndHomeAddress headingSize="md" />
<Divider />
<OccupationFields subject="client" />          {/* same as 01-buyer §5 */}
{civilStatus === "Married" && (<><Divider /><SpouseInformation onWhiteCard /></>)}   {/* 02-spouse */}
```

---

## 4. Co-Buyer selfie card

```tsx
<div className="flex flex-col gap-4 rounded-2xl bg-gray-50 px-2 py-3 md:p-4">
  <h4 className="m-0 flex gap-1 text-base font-semibold leading-6 text-gray-900">
    Co-Buyer #1 Selfie with Valid ID<span className="text-brand-600">*</span>
  </h4>

  {/* Instruction callout */}
  <p className="m-0 flex gap-3 rounded-lg border-l-4 border-brand-500 bg-brand-25 px-4 py-3 text-sm font-medium italic leading-5 text-brand-600">
    <svg width="20" height="20" className="mt-0.5 shrink-0" … />
    Please submit a selfie while holding the same valid government-issued ID…
  </p>

  <div className="flex flex-col gap-0.5">
    <p className="m-0 text-sm font-semibold leading-5 text-gray-900">How would you like to submit your picture?</p>
    <p className="m-0 text-xs leading-[18px] text-gray-500">Choose a method to continue</p>
  </div>

  {/* Segmented switch: full width + compact on phones, fit on desktop */}
  <div role="tablist" className="flex w-full md:w-fit gap-0 rounded-lg md:rounded-[12px] bg-gray-100 p-0.5 md:p-1">
    <button role="tab"
      className="flex h-8 md:h-auto flex-1 md:flex-none items-center justify-center gap-1.5 md:gap-2 rounded-md md:rounded-lg px-3 md:px-3.5 md:py-1.5 text-[13px] md:text-sm font-semibold leading-5 [&>svg]:h-4 [&>svg]:w-4 md:[&>svg]:h-5 md:[&>svg]:w-5">
      {/* icon: 16px on phones, 20px on desktop */} Take Selfie
    </button>
    <button role="tab" className="…same…">Upload Photo</button>
  </div>

  {/* Preview / camera / upload drop area: always aspect-video w-full rounded-xl */}
  <button className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#6293f8] bg-brand-25 text-center">
    <span className="text-sm font-semibold text-gray-900">Upload your selfie with your ID</span>
    <span className="text-xs text-gray-500">JPEG, JPG or PNG • Max 5 MB</span>
  </button>
</div>
```

- The segmented tabs are **full width but compact on phones**: 32px tall (`h-8`), 13px text, 16px icons and a 2px track padding. On desktop they size to fit their content (`md:flex-none md:w-fit md:py-1.5`), with 14px text and 20px icons.
- Callout icons use `mt-0.5 shrink-0` so they stay aligned with the first line of text and don't shrink.
- Media uses `aspect-video w-full`, so the height follows the width on every screen.
