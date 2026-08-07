import type { ButtonHTMLAttributes } from "react";

/**
 * Button — the single shared source of truth for every CTA-style button in
 * the app (Primary / Secondary / Tertiary) plus IconButton for icon-only
 * circular actions. Reference: Figma file NcMe5sSgPs65q3Ed2rV1Kv, node
 * 9:9698 ("Button CTA" kitchen sink). Shown in full on the /component page
 * (ComponentsPage.tsx), which renders these exact components — not a copy —
 * so changing a class here updates both the reference page and every screen
 * that imports Button/IconButton.
 *
 * Styling is class-based: the actual look lives in src/tailwind.css under
 * `@layer components` as .btn-base/.btn-{variant}/.btn-{size} and
 * .btn-icon/.btn-icon-{size}, each built with @apply. This file only maps
 * props to those class names — it holds no utility strings itself, so a
 * design change is a CSS edit in one file, not a TSX edit.
 *
 * NOTE ON SCOPE: this covers CTA-style actions (Search, Register, Cancel,
 * Download PDF, Proceed, etc). It intentionally does NOT replace the
 * separate "ghost utility icon" pattern used for table row actions, modal
 * close (X), the sidebar hamburger, or the back-arrow circle — those are a
 * different Untitled-UI primitive ("Button utility", small/transparent/
 * icon-only-for-toolbars) than the filled-circle CTA IconButton shown on the
 * reference page. Ask if you want those unified too.
 */

export type ButtonVariant = "primary" | "secondary" | "secondary-color" | "tertiary";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/** Maps size -> the CSS class defined in tailwind.css (@layer components). */
export const BUTTON_SIZE_CLASSES: Record<ButtonSize, string> = {
  xs: "btn-xs",
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
  xl: "btn-xl",
};

/** Maps size -> the icon-button CSS class defined in tailwind.css. */
export const ICON_BUTTON_SIZE_CLASSES: Record<ButtonSize, string> = {
  xs: "btn-icon-xs",
  sm: "btn-icon-sm",
  md: "btn-icon-md",
  lg: "btn-icon-lg",
  xl: "btn-icon-xl",
};

/** Maps variant -> the CSS class defined in tailwind.css. */
export const BUTTON_VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  "secondary-color": "btn-secondary-color",
  tertiary: "btn-tertiary",
};

export default function Button({
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={
        "btn-base " +
        BUTTON_SIZE_CLASSES[size] +
        " " +
        BUTTON_VARIANT_CLASSES[variant] +
        (className ? " " + className : "")
      }
      {...rest}
    />
  );
}

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  "aria-label": string;
}

/** Filled-circle icon-only CTA button (the reference's rightmost column) — not the ghost table-row-action icon pattern. */
export function IconButton({ size = "md", type = "button", className = "", ...rest }: IconButtonProps) {
  return (
    <button
      type={type}
      className={"btn-icon " + ICON_BUTTON_SIZE_CLASSES[size] + (className ? " " + className : "")}
      {...rest}
    />
  );
}
