import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * RowActionButton ("Table Action Button" on the /component page) — icon +
 * label action used in table "Actions" columns (e.g. View / Image / Hold,
 * View / Register, View / Deactivate). Icon and label share one color so
 * hover/disabled apply consistently: default gray-400, hover bg-slate-100
 * with brand-500 text/icon, disabled gray-300 text/icon.
 */
export interface RowActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
}

export default function RowActionButton({
  icon,
  label,
  className = "",
  type = "button",
  ...rest
}: RowActionButtonProps) {
  return (
    <button
      type={type}
      className={
        "flex h-8 cursor-pointer items-center gap-1 overflow-hidden rounded-lg px-3 py-2 text-xs font-medium text-gray-400 transition-colors hover:bg-slate-100 hover:text-brand-500 disabled:cursor-not-allowed disabled:text-gray-300" +
        (className ? " " + className : "")
      }
      {...rest}
    >
      {icon}
      {label}
    </button>
  );
}
