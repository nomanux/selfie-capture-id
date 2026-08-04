import { XIcon } from "./icons";

/**
 * ImagePreviewModal — "Property Unit Image" modal opened by clicking the
 * image-icon row action in the Unit / Parking Slot / Service Area tables.
 * Source: Figma file NcMe5sSgPs65q3Ed2rV1Kv, node 173418:206567 ("Modal").
 */
export default function ImagePreviewModal({
  imageUrl,
  imageAlt = "Property unit image",
  onClose,
}: {
  imageUrl?: string;
  imageAlt?: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Property Unit Image"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">Property Unit Image</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-gray-500 hover:bg-gray-50"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-5">
          <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
            {imageUrl ? (
              <img src={imageUrl} alt={imageAlt} className="max-h-full w-full object-contain" />
            ) : (
              <span className="p-10 text-center text-sm text-gray-400">No image uploaded for this unit yet.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
