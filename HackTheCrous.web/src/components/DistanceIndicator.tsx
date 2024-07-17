import { Coordinates } from "../types";
import { useGeolocation } from "../utils/geolocation";

export default function DistanceIndicator({
  coordinates,
}: {
  coordinates: Coordinates;
}) {
  const { distance, error } = useGeolocation({ coordinates });

  if (error) {
    return (
      <span className="rounded-full border-offwhite border-xs flex flex-row px-2 w-fit gap-2 items-center justify-center my-2">
        <p className={`text-sm`}>Erreur</p>
      </span>
    );
  }

  if (distance === undefined) {
    return (
      <span className="rounded-full border-offwhite border-xs flex flex-row px-2 w-fit gap-2 items-center justify-center my-2">
        <p className={`text-sm`}>Universite Triolet</p>
      </span>
    );
  }

  return (
    <span className="rounded-full border-offwhite border-xs flex flex-row px-2 w-fit gap-2 items-center justify-center my-2">
      <p className={`text-sm`}>{distance} mètres</p>
    </span>
  );
}
