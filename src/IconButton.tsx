import type { ButtonHTMLAttributes } from "react";

/**
 * IconButton (Secondary) — Small outlined square icon button variant.
 * Used for secondary actions next to form fields (e.g., Unit No., Promo Discount).
 * Features a gray border, white background, and subtle hover state.
 *
 * Reference: Figma file NcMe5sSgPs65q3Ed2rV1Kv, "Secondary Icon Button" component.
 * Styling: Defined in src/tailwind.css as .btn-icon-secondary-base + .btn-icon-secondary-{size}.
 */

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function IconButton({
  "aria-label": ariaLabel,
  children,
  size = "sm",
  type = "button",
  className = "",
  ...rest
}: IconButtonProps) {
  const sizeClass = `btn-icon-secondary-${size}`;

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={`btn-icon-secondary-base ${sizeClass}${className ? " " + className : ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}
