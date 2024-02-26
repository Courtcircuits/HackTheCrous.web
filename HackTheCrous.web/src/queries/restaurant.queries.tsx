import { useQuery } from "react-query";
import { Meal, Restaurant } from "../types";
import useDebounce from "../hooks/debouncer";

const fetchRestaurantMeals = async ({
  id,
}: {
  id: number;
}): Promise<Meal[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/restaurants/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
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
    }
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
    }
  );

  const data = await response.json();

  return await data;
};

export const useRestaurants = () => {
  const { data, error } = useQuery({
    queryKey: "restaurants",
    queryFn: fetchRestaurants,
  });
  return { data, error };
};

export const useRestaurantMeals = (id: number) => {
  const { data, error } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => fetchRestaurantMeals({ id }),
  });
  return { data, error };
};

export const useSearchRestaurant = (search: string, debounce?: number) => {
  const debouncedValue = useDebounce<string>(search, debounce || 0);

  const { data, error } = useQuery({
    queryKey: ["search", debouncedValue],
    queryFn: () => fetchSearchRestaurant(debouncedValue),
  });
  return { data, error };
};
