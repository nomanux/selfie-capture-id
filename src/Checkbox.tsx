import { useEffect, useRef, type InputHTMLAttributes } from "react";

/**
 * Checkbox — the single shared source of truth for every checkbox in the
 * app (table row selection, etc). Shown on the /component page
 * (ComponentsPage.tsx), which renders this exact component, not a copy — so
 * editing a class in tailwind.css's `.checkbox-*` rules updates both the
 * reference page and every screen that imports Checkbox. Styling is
 * class-based (see src/tailwind.css `@layer components`), mirroring
 * Button.tsx / Select.tsx / Input.tsx's pattern — this file holds no
 * utility strings.
 * Source: Figma file NcMe5sSgPs65q3Ed2rV1Kv, node 18:14072.
 */

export type CheckboxSize = "sm" | "md";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: CheckboxSize;
  /** "Select all" header checkboxes use this when some, but not all, rows are checked. Set via a ref — `indeterminate` isn't a real HTML attribute. */
  indeterminate?: boolean;
}

/** Maps size -> the CSS class defined in tailwind.css (@layer components). */
export const CHECKBOX_SIZE_CLASSES: Record<CheckboxSize, string> = {
  sm: "checkbox-sm",
  md: "checkbox-md",
};

export default function Checkbox({ size = "sm", className = "", type = "checkbox", indeterminate = false, ...rest }: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <input
      ref={inputRef}
      type={type}
      className={"checkbox-field " + CHECKBOX_SIZE_CLASSES[size] + (className ? " " + className : "")}
      {...rest}
    />
  );
}
