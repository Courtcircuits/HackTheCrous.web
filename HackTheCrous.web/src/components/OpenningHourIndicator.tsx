import { useEffect, useState } from "react";
import { OpeningHours, hoursParse } from "../utils/hoursParse";

export default function OpenningHourIndicator({ hours }: { hours: string }) {
  const [parsedHours, setParsedHours] = useState<OpeningHours | null>(
    hoursParse(hours),
  );

  useEffect(() => {
    setInterval(() => {
      setParsedHours(hoursParse(hours));
    }, 30000);
  }, [hours]);

  const label = parsedHours ? parsedHours.label : "fermé";
  const colors = parsedHours
    ? parsedHours.status === "CLOSED"
      ? "warn"
      : parsedHours.status === "SOON"
        ? "orange"
        : "primary"
    : "warn";

  return (
    <span className="rounded-full border-offwhite border-xs flex flex-row px-2 w-fit gap-2 items-center justify-center h-fit o overflow-hidden">
      <div className={`w-2 h-2 rounded-full content-none bg-${colors} shadow-c-${colors}`}></div>
      <p className={`text-sm`}>{label}</p>
    </span>
  );
}
