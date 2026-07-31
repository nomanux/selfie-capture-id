/**
 * Real asset references exported from the Figma file
 * (fileKey: NcMe5sSgPs65q3Ed2rV1Kv, node: 173648:282606 "Ra Form(Web)").
 *
 * NOTE ON PROVENANCE: this sandbox's outbound network proxy blocks
 * www.figma.com (curl / fetch return `403 blocked-by-allowlist`), so the
 * PNG/SVG bytes could not be downloaded and saved to disk here. These
 * constants point directly at the real Figma-exported CDN URLs (not
 * invented placeholders) returned by the Figma MCP `get_design_context` /
 * `download_assets` calls. Figma's asset URLs are valid for about 7 days.
 * To make the app fully offline/permanent, download each URL below and
 * replace the constant with a local `import` from this folder.
 */

const FIGMA_ASSET_BASE = "https://www.figma.com/api/mcp/asset";

// Header logo (shield symbol + "Sales" tag + "DMCI HOMES" wordmark)
export const logoSymbolUrl = `${FIGMA_ASSET_BASE}/ed578424-0fb6-4807-bc38-a31bc2df91f2`;
export const logoSalesUrl = `${FIGMA_ASSET_BASE}/58e97090-407c-4f98-b85d-6d461afcb5bb`;
export const logoTextUrl = `${FIGMA_ASSET_BASE}/3a77d004-fddc-4fde-adc7-33b697048369`;

// Take selfie / Upload Photo toggle icons
export const takeSelfieIconUrl = `${FIGMA_ASSET_BASE}/e2453afa-388a-465a-9988-cde9196fda9b`;
export const uploadIconUrl = `${FIGMA_ASSET_BASE}/17acb4da-c3f7-455e-b205-9044ad4491ff`;

// Left column: live selfie preview + capture button icon
export const selfiePreviewPhotoUrl = `${FIGMA_ASSET_BASE}/21e1a6b1-a80d-42b5-a225-4eb0e6d960b7`;
export const captureIconUrl = `${FIGMA_ASSET_BASE}/ab55786c-3812-4630-bf3e-b9291993b802`;

// Right column: uploaded government ID (UMID) photo
export const idCardImageUrl = `${FIGMA_ASSET_BASE}/8fc4121f-80cc-47bf-a411-ca346631dac2`;

// Thumbnail status badges
export const badgeXIconUrl = `${FIGMA_ASSET_BASE}/0629e1c3-f80d-4a34-a1ae-d335eea527cd`;
export const badgeCheckIconUrl = `${FIGMA_ASSET_BASE}/a661bd34-26e4-4ba5-84a9-74be8a634d43`;

// Previous selfie-attempt thumbnails (1-3 failed/red, 4 accepted/green)
export const thumbnailPhoto1Url = `${FIGMA_ASSET_BASE}/4fb7e6fa-b870-4695-8d48-13e98f159ca1`;
export const thumbnailPhoto2Url = `${FIGMA_ASSET_BASE}/89046d66-6204-423e-8d5e-bba95c73c55d`;
export const thumbnailPhoto3Url = `${FIGMA_ASSET_BASE}/f2ff4112-79d2-4c47-bc47-ed8714f0f8f9`;
export const thumbnailPhoto4Url = `${FIGMA_ASSET_BASE}/8c5a6e4b-d698-4f98-8067-8aa129bcd1ba`;
