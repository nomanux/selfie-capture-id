import type { InputHTMLAttributes } from "react";

/**
 * Checkbox — the single shared source of truth for every checkbox in the
 * app (table row selection, etc). Shown on the /component page
 * (ComponentsPage.tsx), which renders this exact component, not a copy — so
 * editing a class in tailwind.css's `.checkbox-*` rules updates both the
 * reference page and every screen that imports Checkbox. Styling is
 * class-based (see src/tailwind.css `@layer components`), mirroring
 * Button.tsx / Select.tsx / Input.tsx's pattern — this file holds no
 * utility strings.
 */

export type CheckboxSize = "sm" | "md";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: CheckboxSize;
}

/** Maps size -> the CSS class defined in tailwind.css (@layer components). */
export const CHECKBOX_SIZE_CLASSES: Record<CheckboxSize, string> = {
  sm: "checkbox-sm",
  md: "checkbox-md",
};

export default function Checkbox({ size = "sm", className = "", type = "checkbox", ...rest }: CheckboxProps) {
  return (
    <input
      type={type}
      className={"checkbox-field " + CHECKBOX_SIZE_CLASSES[size] + (className ? " " + className : "")}
      {...rest}
    />
  );
}
