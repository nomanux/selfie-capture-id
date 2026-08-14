import { useState, type ChangeEvent, type InputHTMLAttributes } from "react";
import { XIcon } from "./icons";

/**
 * Input — the single shared source of truth for every plain text / date
 * <input> in the app. Shown on the /component page (ComponentsPage.tsx),
 * which renders this exact component, not a copy — so editing a class in
 * tailwind.css's `.input-*` rules updates both the reference page and every
 * screen that imports Input (FilterBar's text/date fields, etc). Styling is
 * class-based (see src/tailwind.css `@layer components`), mirroring
 * Button.tsx / Select.tsx's pattern — this file holds no utility strings.
 *
 * Text inputs get a small "x" once they have a value, so the person can clear
 * the field in one click instead of selecting/backspacing — matches Select's
 * "Clear" row. Skipped for readOnly/disabled fields (e.g. ComputationSheet's
 * display-only rows) and any non-text type (date keeps its native picker),
 * and can be forced either way with the `clearable` prop.
 */

export type InputSize = "sm" | "md";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  clearable?: boolean;
}

/** Maps size -> the CSS class defined in tailwind.css (@layer components). */
export const INPUT_SIZE_CLASSES: Record<InputSize, string> = {
  sm: "input-sm",
  md: "input-md",
};

export default function Input({
  size = "sm",
  className = "",
  clearable,
  type = "text",
  value,
  defaultValue,
  onChange,
  ...rest
}: InputProps) {
  const isClearable = clearable ?? (type === "text" && !rest.readOnly && !rest.disabled);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");

  if (!isClearable) {
    return (
      <input
        type={type}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        className={"input-field " + INPUT_SIZE_CLASSES[size] + (className ? " " + className : "")}
        {...rest}
      />
    );
  }

  const currentValue = value ?? internalValue;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInternalValue(event.target.value);
    onChange?.(event);
  }

  function handleClear() {
    setInternalValue("");
    const event = { target: { value: "" } } as ChangeEvent<HTMLInputElement>;
    onChange?.(event);
  }

  return (
    <div className={"relative " + className}>
      <input
        type={type}
        value={currentValue}
        onChange={handleChange}
        className={"input-field pr-8 " + INPUT_SIZE_CLASSES[size]}
        {...rest}
      />
      {currentValue !== "" && (
        <button
          type="button"
          aria-label="Clear"
          onClick={handleClear}
          className="absolute right-2 top-1/2 flex h-4 w-4 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <XIcon className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
