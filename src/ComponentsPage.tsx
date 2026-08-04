import { SearchIcon } from "./icons";
import Button, { IconButton, type ButtonSize, type ButtonVariant } from "./Button";
import Select from "./Select";
import Input from "./Input";
import Checkbox from "./Checkbox";

/**
 * ComponentsPage — standalone style-guide screen listing the shared form
 * primitives (Button, Input, Date picker, Dropdown) so any screen can be
 * checked against a single source of truth instead of re-guessing control
 * sizes/colors per page. Reachable directly at /component (see main.tsx).
 * Not wrapped in the dashboard Layout — this is a reference page, not part
 * of the CRF/RA app flow.
 *
 * The Button section renders the actual shared Button / IconButton
 * components from ./Button.tsx (not a copy of their styles) — reference:
 * Figma file NcMe5sSgPs65q3Ed2rV1Kv, node 9:9698 ("Button CTA" kitchen
 * sink). 4 style variants x 5 sizes (xs-xl). Editing Button.tsx changes
 * both this page and every screen that imports it. "Default" is the real
 * resting state; hover the buttons to see the real :hover state — it isn't
 * faked here.
 */

const DUMMY_OPTIONS = Array.from({ length: 10 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }));

const BUTTON_SIZES: { size: ButtonSize; label: string; iconClasses: string }[] = [
  { size: "xs", label: "XS / 28px", iconClasses: "h-3.5 w-3.5" },
  { size: "sm", label: "SM / 32px", iconClasses: "h-4 w-4" },
  { size: "md", label: "MD / 40px", iconClasses: "h-4 w-4" },
  { size: "lg", label: "LG / 44px", iconClasses: "h-5 w-5" },
  { size: "xl", label: "XL / 48px", iconClasses: "h-5 w-5" },
];

function SizeHeaderRow() {
  return (
    <tr>
      <th className="w-24 px-2 py-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">State</th>
      {BUTTON_SIZES.map((s) => (
        <th key={s.size} className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
          {s.label}
        </th>
      ))}
    </tr>
  );
}

function ButtonVariantTable({ variant }: { variant: ButtonVariant }) {
  return (
    <div className="overflow-x-auto">
      <table className="border-collapse text-sm">
        <thead>
          <SizeHeaderRow />
        </thead>
        <tbody>
          {[false, true].map((isDisabled) => (
            <tr key={String(isDisabled)}>
              <td className="px-2 py-2 text-sm font-medium text-gray-700">{isDisabled ? "Disabled" : "Default"}</td>
              {BUTTON_SIZES.map(({ size, iconClasses }) => (
                <td key={size} className="px-3 py-2">
                  <Button variant={variant} size={size} disabled={isDisabled}>
                    <SearchIcon className={iconClasses} />
                    Button CTA
                  </Button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function IconOnlyButtonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="border-collapse text-sm">
        <thead>
          <SizeHeaderRow />
        </thead>
        <tbody>
          {[false, true].map((isDisabled) => (
            <tr key={String(isDisabled)}>
              <td className="px-2 py-2 text-sm font-medium text-gray-700">{isDisabled ? "Disabled" : "Default"}</td>
              {BUTTON_SIZES.map(({ size, iconClasses }) => (
                <td key={size} className="px-3 py-2">
                  <IconButton size={size} aria-label="Icon action" disabled={isDisabled}>
                    <SearchIcon className={iconClasses} />
                  </IconButton>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Swatch({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</span>
      {children}
    </div>
  );
}

function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-6 shadow-[0_1px_2px_rgba(10,13,18,0.05)]">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      {children}
    </section>
  );
}

export default function ComponentsPage() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-6 sm:px-10">
        <h1 className="text-xl font-semibold text-gray-900">Component Library</h1>
        <p className="mt-1 text-sm text-gray-600">
          Full button variant set (reference: Figma node 9:9698) plus small/medium sizes for the remaining shared
          form primitives used across the DMCI Homes Sales CRF/RA app.
        </p>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8 sm:px-10">
        {/* Button */}
        <Section
          title="Button"
          description="Primary (filled), Secondary (outline), Tertiary (text-only), and Icon-only — 5 sizes x 3 states each."
        >
          <div className="flex flex-col gap-6">
            <Swatch label="Primary">
              <ButtonVariantTable variant="primary" />
            </Swatch>
            <Swatch label="Secondary">
              <ButtonVariantTable variant="secondary" />
            </Swatch>
            <Swatch label="Tertiary">
              <ButtonVariantTable variant="tertiary" />
            </Swatch>
            <Swatch label="Icon-only">
              <IconOnlyButtonTable />
            </Swatch>
          </div>
        </Section>

        {/* Input */}
        <Section title="Input" description="Plain text field, small and medium heights.">
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
            <Swatch label="Small (h-8)">
              <Input size="sm" type="text" placeholder="Enter a value" className="w-56" />
            </Swatch>
            <Swatch label="Medium (h-10)">
              <Input size="md" type="text" placeholder="Enter a value" className="w-56" />
            </Swatch>
          </div>
        </Section>

        {/* Date picker */}
        <Section title="Date picker" description="Native date input, small and medium heights.">
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
            <Swatch label="Small (h-8)">
              <Input size="sm" type="date" aria-label="Date" className="w-48" />
            </Swatch>
            <Swatch label="Medium (h-10)">
              <Input size="md" type="date" aria-label="Date" className="w-48" />
            </Swatch>
          </div>
        </Section>

        {/* Dropdown */}
        <Section
          title="Dropdown"
          description="Custom combobox (not a native select) filled with dummy 1-10 options. Selected row shows bg-primary-25/text-primary-500, plus a Clear action — open one to see it."
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
            <Swatch label="Small (h-8)">
              <div className="w-56">
                <Select size="sm" options={DUMMY_OPTIONS} placeholder="Select one" />
              </div>
            </Swatch>
            <Swatch label="Medium (h-10) — pre-selected">
              <div className="w-56">
                <Select size="md" options={DUMMY_OPTIONS} placeholder="Select one" defaultValue="4" />
              </div>
            </Swatch>
          </div>
        </Section>

        {/* Checkbox */}
        <Section title="Checkbox" description="Table row selection checkbox, small and medium sizes, default/checked/disabled.">
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
            <Swatch label="Small (h-4)">
              <div className="flex items-center gap-4">
                <Checkbox size="sm" aria-label="Unchecked" />
                <Checkbox size="sm" defaultChecked aria-label="Checked" />
                <Checkbox size="sm" disabled aria-label="Disabled" />
                <Checkbox size="sm" disabled defaultChecked aria-label="Disabled checked" />
              </div>
            </Swatch>
            <Swatch label="Medium (h-5)">
              <div className="flex items-center gap-4">
                <Checkbox size="md" aria-label="Unchecked" />
                <Checkbox size="md" defaultChecked aria-label="Checked" />
                <Checkbox size="md" disabled aria-label="Disabled" />
                <Checkbox size="md" disabled defaultChecked aria-label="Disabled checked" />
              </div>
            </Swatch>
          </div>
        </Section>
      </main>
    </div>
  );
}
