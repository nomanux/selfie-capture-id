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

import unitFloorplanB3Png from "./unit-floorplan-b3.png";
import dmciLogoSvg from "./dmci-logo.svg";
import acaciaEstatesLogoPng from "./acacia-estates-logo.png";
import aristaPlaceLogoPng from "./arista-place-logo.png";
import valeronTowerLogoPng from "./valeron-tower-logo.png";
import noImageAvailablePng from "./no-image-available.png";
import noImageAvailableGraphicSvg from "./no-image-available-graphic.svg";
import thumbnailPhoto1Png from "./1.png";
import thumbnailPhoto2Png from "./2.png";
import thumbnailPhoto3Png from "./3.png";
import idCardImagePng from "./right.png";

const FIGMA_ASSET_BASE = "https://www.figma.com/api/mcp/asset";

// Sample unit floor plan (Accolade Place, "MID UNIT (B3)") supplied by the
// user as a reference for the "Property Unit Image" modal opened from the
// Unit / Unit Availability tables' image-icon row action. Bundled locally
// (not a remote Figma URL) so it never expires.
export const unitFloorplanB3Url = unitFloorplanB3Png;

// Header logo (shield symbol + "Sales" tag + "DMCI HOMES" wordmark, combined
// into one image). Supplied directly by the user, bundled locally so it
// never expires — the old three-part Figma CDN export (logoSymbolUrl /
// logoSalesUrl / logoTextUrl) broke after ~7 days once those temporary URLs
// expired.
export const dmciLogoUrl = dmciLogoSvg;

// Property List grid-view card logos (Acacia Estates, Arista Place, The
// Valeron Tower) + the "No Image Available" placeholder graphic. Supplied
// directly by the user, bundled locally so they never expire — replaces the
// earlier temporary Figma CDN pull.
export const acaciaEstatesLogoUrl = acaciaEstatesLogoPng;
export const aristaPlaceLogoUrl = aristaPlaceLogoPng;
export const valeronTowerLogoUrl = valeronTowerLogoPng;
export const noImageAvailableUrl = noImageAvailablePng;

// "No Image Available" graphic (house icon + diagonal line + wordmark, all
// one vector) used on the Unit Availability Details "Property Unit Image"
// panel. Supplied directly by the user as inline SVG — node 173424:198691.
export const noImageAvailableGraphicUrl = noImageAvailableGraphicSvg;

// Take selfie / Upload Photo toggle icons
export const takeSelfieIconUrl = `${FIGMA_ASSET_BASE}/e2453afa-388a-465a-9988-cde9196fda9b`;
export const uploadIconUrl = `${FIGMA_ASSET_BASE}/17acb4da-c3f7-455e-b205-9044ad4491ff`;

// Left column: live selfie preview + capture button icon
export const selfiePreviewPhotoUrl = `${FIGMA_ASSET_BASE}/21e1a6b1-a80d-42b5-a225-4eb0e6d960b7`;
export const captureIconUrl = `${FIGMA_ASSET_BASE}/ab55786c-3812-4630-bf3e-b9291993b802`;

// Right column: uploaded government ID (UMID) photo - now using local image
export const idCardImageUrl = idCardImagePng;

// Thumbnail status badges
export const badgeXIconUrl = `${FIGMA_ASSET_BASE}/0629e1c3-f80d-4a34-a1ae-d335eea527cd`;
export const badgeCheckIconUrl = `${FIGMA_ASSET_BASE}/a661bd34-26e4-4ba5-84a9-74be8a634d43`;

// Previous selfie-attempt thumbnails (1-3 failed/red, 4 accepted/green) - now using local images
export const thumbnailPhoto1Url = thumbnailPhoto1Png;
export const thumbnailPhoto2Url = thumbnailPhoto2Png;
export const thumbnailPhoto3Url = thumbnailPhoto3Png;
export const thumbnailPhoto4Url = thumbnailPhoto3Png; // Using 3.png as fallback for 4th thumbnail (accepted)
