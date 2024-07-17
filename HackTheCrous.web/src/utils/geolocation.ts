import { useCallback, useEffect, useState } from "react";
import { Coordinates } from "../types";

function computeDistance(
  coordinates1: Coordinates,
  coordinates2: Coordinates,
): number {
  // implementation
  const R = 6371e3;
  const phi1 = (coordinates1.X * Math.PI) / 180;
  const phi2 = (coordinates2.X * Math.PI) / 180;
  const deltaPhi = ((coordinates2.X - coordinates1.X) * Math.PI) / 180;
  const deltaLambda = ((coordinates2.Y - coordinates1.Y) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export function useGeolocation({ coordinates }: { coordinates: Coordinates }) {
  const [distance, setDistance] = useState<number | undefined>(undefined);
  const [watchId, setWatchId] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const handleLocation = useCallback(
    (position: GeolocationPosition) => {
      console.log(position.coords.latitude, position.coords.longitude);
      setDistance(
        computeDistance(coordinates, {
          X: position.coords.latitude,
          Y: position.coords.longitude,
        }),
      );
    },
    [coordinates],
  );

  useEffect(() => {
    if (coordinates === undefined) {
      navigator.geolocation.getCurrentPosition(
        (position) => handleLocation(position),
        (e) => {
          setError(error);

          console.error(e);
        },
      );
    } else {
      if (watchId === undefined)
        setWatchId(() =>
          navigator.geolocation.watchPosition(
            (position) => handleLocation(position),
            (e) => {
              setError(error);

              console.error(e);
            },
          ),
        );
    }
    return () => {
      if (watchId !== undefined) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [coordinates, handleLocation, watchId, error]);

  return {
    distance,
    error,
  };
}
