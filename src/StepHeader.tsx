import type { ReactNode } from "react";

/**
 * Shared heading for every CaptureSelfieTrack step: left-aligned dark title
 * with a short grey description underneath (description may include links).
 * `className` sets the wrapper's padding so the header lines up with the
 * step's own content gutter.
 */
export default function StepHeader({
  title,
  children,
  className = "",
}: {
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={"flex flex-col gap-1 " + className}>
      <h1 className="m-0 text-lg md:text-2xl leading-7 md:leading-8 font-bold text-brand-800">
        {title}
      </h1>
      {children && (
        <p className="m-0 text-sm leading-5 text-gray-600">{children}</p>
      )}
    </div>
  );
}
