import Layout, { PageBackHeading } from "./Layout";
import { LinkIcon, ChevronLeftIcon, ChevronRightIcon } from "./icons";
import { useNavigation, type Screen } from "./NavigationContext";

/**
 * ProjectDetails — a single project's overview screen, reached from the
 * Property List by clicking a project row/card. The five pills top-right
 * (Tower / Floor / Unit / Parking Slot / Service Area) are the entry points
 * into each resource table for this project.
 * Source: Figma file NcMe5sSgPs65q3Ed2rV1Kv, node 173418:205335.
 */

const RESOURCE_TABS: { label: string; screen: Screen }[] = [
  { label: "Tower", screen: "tower" },
  { label: "Floor", screen: "floor" },
  { label: "Unit", screen: "unit" },
  { label: "Parking Slot", screen: "parking-slot" },
  { label: "Service Area", screen: "service-area" },
];

const PROJECT_INFO: { label: string; value: string }[] = [
  { label: "Project Code", value: "ACE" },
  { label: "Project Status", value: "Ready for Occupancy" },
  { label: "Project Type", value: "Mid-rise" },
  { label: "Project Address", value: "P. Tuazon Boulevard Kaunlaran Quezon Paolo 1111-D Metro Manila, Philippines" },
  { label: "No. of Building/s", value: "1" },
  { label: "Floor/s per Tower", value: "6" },
  { label: "Total Unit/s", value: "435" },
];

interface OverviewRow {
  code: string;
  screen: Screen;
  total: number;
  sold: number;
  available: number;
  onHold: number;
}

const OVERVIEW_ROWS: OverviewRow[] = [
  { code: "Units", screen: "unit", total: 1, sold: 130, available: 130, onHold: 130 },
  { code: "Parking Slot", screen: "parking-slot", total: 5, sold: 523, available: 523, onHold: 523 },
  { code: "Service Area", screen: "service-area", total: 10, sold: 874, available: 874, onHold: 874 },
];

const RECENTLY_VIEWED = ["Acacia Estates", "Arista Place", "The Valeron Tower", "Alta Vista De Boracay"];

export default function ProjectDetails() {
  const { route, navigate } = useNavigation();
  const project = route.project ?? "Acacia Estates";

  return (
    <Layout
      active="properties"
      activeSubItem="Projects"
      breadcrumb={[
        { label: "Property", onClick: () => navigate({ screen: "properties" }) },
        { label: "List", onClick: () => navigate({ screen: "properties" }) },
        { label: project },
      ]}
      orgBadge
    >
      <div className="flex w-full flex-col gap-5 px-6 py-4">
        <PageBackHeading title="Project Details" onBack={() => navigate({ screen: "properties" })} />

        <section className="flex w-full flex-col gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-[0_1px_2px_rgba(10,13,18,0.05)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold text-primary-500">{project}</h2>
            <div className="flex flex-wrap gap-2">
              {RESOURCE_TABS.map((tab) => (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => navigate({ screen: tab.screen, project })}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-primary-50 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-primary-500 hover:bg-blue-100"
                >
                  <LinkIcon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex h-48 w-full items-center justify-center rounded-lg bg-gray-50 p-6 lg:w-64 lg:shrink-0">
              <span className="text-center text-lg font-bold uppercase tracking-wide text-gray-600">Accolade Place</span>
            </div>
            <dl className="grid flex-1 grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-[160px_1fr]">
              {PROJECT_INFO.map((row) => (
                <div key={row.label} className="contents">
                  <dt className="text-sm text-gray-500">{row.label}</dt>
                  <dd className="text-sm text-gray-900 before:mr-2 before:text-gray-500 before:content-[':']">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-gray-900">Overview</h3>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-gray-500">
                    <th className="px-5 py-3 font-medium">Code</th>
                    <th className="px-5 py-3 text-right font-medium">Total</th>
                    <th className="px-5 py-3 text-right font-medium">Sold</th>
                    <th className="px-5 py-3 text-right font-medium">Available</th>
                    <th className="px-5 py-3 text-right font-medium">On Hold</th>
                  </tr>
                </thead>
                <tbody>
                  {OVERVIEW_ROWS.map((row) => (
                    <tr key={row.code} className="border-t border-gray-100">
                      <td className="px-5 py-3">
                        <button
                          type="button"
                          onClick={() => navigate({ screen: row.screen, project })}
                          className="cursor-pointer font-semibold text-primary-500 underline"
                        >
                          {row.code}
                        </button>
                      </td>
                      <td className="px-5 py-3 text-right text-gray-700">{row.total}</td>
                      <td className="px-5 py-3 text-right text-gray-700">{row.sold}</td>
                      <td className="px-5 py-3 text-right text-gray-700">{row.available}</td>
                      <td className="px-5 py-3 text-right text-gray-700">{row.onHold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="flex w-full flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-[0_1px_2px_rgba(10,13,18,0.05)]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recently Viewed</h3>
            <div className="flex items-center gap-2">
              <button type="button" aria-label="Previous" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button type="button" aria-label="Next" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RECENTLY_VIEWED.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => navigate({ screen: "project-details", project: name })}
                className="flex h-24 cursor-pointer items-center justify-center rounded-lg bg-gray-50 px-4 hover:bg-blue-50"
              >
                <span className="text-center text-sm font-bold uppercase tracking-wide text-gray-400">{name}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
