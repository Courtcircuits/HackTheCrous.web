export interface OpeningHours {
  label: string;
  status: "SOON" | "OPEN" | "CLOSED";
}

export function hoursParse(hours: string): OpeningHours {
  const hourArray = hours.split(" - ");
  const start = hourArray[0].split(":").map((x) => parseInt(x));
  const startVal = start[0] * 60 + start[1];
  const end = hourArray[1].split(":").map((x) => parseInt(x));
  const endVal = end[0] * 60 + end[1];
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentVal = currentHour * 60 + currentMinute;

  if (currentVal < startVal) {
    if (startVal - currentVal < 30) {
      const minutes = startVal - currentVal;
      return { label: `Ouvre dans ${minutes} minutes`, status: "SOON" };
    }
    return { label: `Fermé`, status: "CLOSED" };
  } else if (currentVal > endVal) {
    return { label: `Fermé`, status: "CLOSED" };
  }

  if (Math.abs(endVal - currentVal) < 30) {
    const minutes = Math.abs(endVal - currentVal);
    return { label: `Ferme dans ${minutes} minutes`, status: "SOON" };
  }
  return { label: `Ouvert`, status: "OPEN" };
}
