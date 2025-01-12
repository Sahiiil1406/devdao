import React from "react";

export function ChartContainer({ config, className, children }) {
  return <div className={className}>{children}</div>;
}

export function ChartTooltip({ content, cursor }) {
  return (
    <div className="absolute z-10 bg-gray-800 text-white p-2 rounded shadow-lg">
      {content}
    </div>
  );
}

export function ChartTooltipContent({ indicator, labelKey }) {
  return (
    <div>
      <span className="font-bold">{indicator}</span>: {labelKey}
    </div>
  );
}

export const ChartConfig = {}; // Define this to match your use case.
