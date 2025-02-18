import { useQuery } from "react-query";
import { APIData, Meal, Restaurant, School } from "../types";
import useDebounce from "../hooks/debouncer";
import { useEffect, useState } from "react";

const fetchRestaurantMeals = async ({
  id,
}: {
  id: number;
}): Promise<Meal[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/v2/restaurants/meals/${id}`,
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

const fetchSchoolsForRestaurant = async ({
  id,
}: {
  id: number;
}): Promise<School[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/v2/restaurants/schools/${id}`,
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
}): Promise<APIData<Restaurant>> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/v2/restaurants/${id}`,
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

const fetchRestaurants = async (): Promise<APIData<Restaurant[]>> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/v2/restaurants`,
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

const fetchSearchRestaurant = async (search: string): Promise<APIData<Restaurant[]>> => {
  if (search.length < 3) {
    return {
      data: []
    }
  }
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/v2/restaurants/search?q=${search}`,
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
  return { data: data?.data, error };
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
      const data = metadata.data
      setRestaurant({
        id: data.id,
        type: "restaurant",
        attributes: {
          name: data.attributes.name,
          meals: meals,
          url: data.attributes.url,
          hours: data.attributes.hours,
        }
      });
    }
  }, [metadata, meals]);

  return {
    restaurant,
    metadataError,
    mealsError,
  };
};

export const useSchoolsForRestaurant = (id: number) => {
  const { data, error } = useQuery({
    queryKey: ["schools", id],
    queryFn: () => fetchSchoolsForRestaurant({ id }),
  });
  return { data: data, error };
};
