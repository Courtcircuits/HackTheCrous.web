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
      ? "bg-warn"
      : parsedHours.status === "SOON"
        ? "bg-orange"
        : "bg-primary"
    : "bg-warn";

  return (
    <span className="rounded-full border-offwhite border-xs flex flex-row px-2 w-fit gap-2 items-center justify-center my-2">
      <div className={`w-2 h-2 rounded-full content-none ${colors}`}></div>
      <p className={`text-sm`}>{label}</p>
    </span>
  );
}
