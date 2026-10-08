# Buyer Details Form: Mobile Responsive Guide (part by part)

How to make the Buyer Details form work well on phones while keeping the desktop layout the same.
Every rule here comes from the working version in `selfie-capture-id/src/BuyerDetailsStep.tsx`.

**Stack:** React + Tailwind CSS 3. Phone styles have no prefix, and `md:` (768px and up) restores desktop.
Always write the **mobile value first** and override it with `md:`.

## Order

Do **00** first. Every other part depends on it. After that, each part can be done and shared on its own.

| File | Part | What it covers |
|---|---|---|
| [00-shared-foundation.md](00-shared-foundation.md) | Foundation | Spacing and type scale, page shell, header, grids, Field, inputs, radio, checkbox, Divider |
| [01-buyer.md](01-buyer.md) | Buyer (main client) | Client type, personal, birth place, contact, addresses, ownership, occupation, mailing, reasons, awareness |
| [02-spouse.md](02-spouse.md) | Spouse | Collapsible gray spouse block (buyer's and co-buyer's) |
| [03-co-buyer.md](03-co-buyer.md) | Co-Buyer | Group panel, entry card, co-buyer fields, ID upload, selfie |
| [04-representative.md](04-representative.md) | Representative | Yes/No box + representative details panel |
| [05-pep.md](05-pep.md) | Political Exposure (PEP) | Yes/No box, PEP group panel, PEP entry fields |
| [06-input-components.md](06-input-components.md) | Input components | Tokens, CSS and code for Input, Select, DatePicker, TextArea, Phone, Checkbox, Radio, MultiSelect |

## Final checklist (test at 360px, 390px, 768px, 1280px)

- [ ] No horizontal scroll anywhere (check phone fields, long placeholders, and radio groups).
- [ ] Every `text-*` has a matching `leading-*`.
- [ ] Every field grid is `grid-cols-1` on phones and `items-start`; every Field has `min-w-0`.
- [ ] Every `col-span-*` / fixed `w-*` above 1 column has the `md:` prefix.
- [ ] Section spacing comes from parent `gap-*`, not margins on children.
- [ ] Tinted panels use `-mx-2 md:mx-0 px-2 py-4 md:p-5` (a panel inside another gray panel gets no `-mx-2` and uses `bg-white`).
- [ ] All inputs, selects and date pickers are `h-8` and `text-sm`.
- [ ] Headings with a checkbox or button beside them use `flex-wrap`.
- [ ] Buttons use `w-fit`, and icon buttons are at least `h-8 w-8`.
- [ ] Desktop still looks the same as before (every change is behind `md:`).
