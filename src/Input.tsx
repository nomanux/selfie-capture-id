import type { InputHTMLAttributes } from "react";

/**
 * Input — the single shared source of truth for every plain text / date
 * <input> in the app. Shown on the /component page (ComponentsPage.tsx),
 * which renders this exact component, not a copy — so editing a class in
 * tailwind.css's `.input-*` rules updates both the reference page and every
 * screen that imports Input (FilterBar's text/date fields, etc). Styling is
 * class-based (see src/tailwind.css `@layer components`), mirroring
 * Button.tsx / Select.tsx's pattern — this file holds no utility strings.
 */

export type InputSize = "sm" | "md";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
}

/** Maps size -> the CSS class defined in tailwind.css (@layer components). */
export const INPUT_SIZE_CLASSES: Record<InputSize, string> = {
  sm: "input-sm",
  md: "input-md",
};

export default function Input({ size = "sm", className = "", ...rest }: InputProps) {
  return (
    <input
      className={"input-field " + INPUT_SIZE_CLASSES[size] + (className ? " " + className : "")}
      {...rest}
    />
  );
}
