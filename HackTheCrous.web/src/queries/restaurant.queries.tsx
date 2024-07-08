import { useQuery } from "react-query";
import { Meal, Restaurant } from "../types";
import useDebounce from "../hooks/debouncer";
import { useEffect, useState } from "react";

const fetchRestaurantMeals = async ({
  id,
}: {
  id: number;
}): Promise<Meal[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/restaurants/meals/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();

  return await data;
};

const fetchRestaurantMetadata = async ({
  id,
}: {
  id: number;
}): Promise<Restaurant> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/restaurants/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();

  return await data;
};

const fetchRestaurants = async (): Promise<Restaurant[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/restaurants`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();

  return await data;
};

const fetchSearchRestaurant = async (search: string): Promise<Restaurant[]> => {
  if (search.length < 3) {
    return [];
  }
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/search?q=${search}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();

  return await data;
};

export const useRestaurants = () => {
  const { data, error } = useQuery({
    queryKey: "restaurants",
    queryFn: fetchRestaurants,
    staleTime: 0,
    cacheTime: 5 * 60 * 1000,
  });
  return { data, error };
};

export const useRestaurantMeals = (id: number) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["restaurant_meal", id],
    queryFn: () => fetchRestaurantMeals({ id }),
    staleTime: 0,
    cacheTime: 5 * 60 * 1000,
  });
  return { data, error, isLoading };
};

export const useSearchRestaurant = (search: string, debounce?: number) => {
  const debouncedValue = useDebounce<string>(search, debounce || 0);

  const { data, error } = useQuery({
    queryKey: ["search", debouncedValue],
    queryFn: () => fetchSearchRestaurant(debouncedValue),
  });
  return { data, error };
};

export const useRestaurantMetadata = (id: number) => {
  const { data, error } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => fetchRestaurantMetadata({ id }),
  });
  return { data, error };
};

interface UseRestaurant {
  restaurant: Restaurant | null;
  metadataError: unknown;
  mealsError: unknown;
}

export const useRestaurant = (id: number): UseRestaurant => {
  const { data: metadata, error: metadataError } = useRestaurantMetadata(id);
  const { data: meals, error: mealsError } = useRestaurantMeals(id);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    if (metadata && meals) {
      setRestaurant({
        id: metadata.id,
        name: metadata.name,
        meals: meals,
        url: metadata.url,
        hours: metadata.hours,
      });
    }
  }, [metadata, meals]);

  return {
    restaurant,
    metadataError,
    mealsError,
  };
};
