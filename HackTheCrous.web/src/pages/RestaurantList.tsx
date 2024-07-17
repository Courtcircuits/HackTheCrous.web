import { useEffect, useState } from "react";
import { useRestaurants } from "../queries/restaurant.queries";
import { Restaurant } from "../types";
import { AnimatePresence } from "framer-motion";
import RestaurantCard from "../components/RestaurantCard";
import Tag from "../components/Tag";

export default function RestaurantList() {
  const { data, error } = useRestaurants();
  const filters = ["Resto", "Cafet", "Brasserie"];
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const selectFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  useEffect(() => {
    const fitlerRestaurants = (
      data: Restaurant[] | undefined
    ): Restaurant[] => {
      if (!data) return [];
      if (selectedFilters.length === 0) {
        return data;
      }
      return data?.filter((restaurant) => {
        let contains = false;
        for (let i = 0; i < selectedFilters.length; i++) {
          contains = contains || restaurant.name.includes(selectedFilters[i]);
        }
        return contains;
      });
    };
    setRestaurants(fitlerRestaurants(data));
  }, [data, restaurants, selectedFilters]);

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <>
      <div className="col-span-12 sm:col-span-8 flex flex-row">
        {filters.map((filter) => (
          <Tag
            key={filter}
            label={filter}
            selected={selectedFilters.includes(filter)}
            setSelected={() => {
              selectFilter(filter);
            }}
          />
        ))}
      </div>
      <div className="col-span-12 sm:col-span-4">
        <AnimatePresence initial={false}>
          {restaurants
            ?.filter((_, index) => index % 2 == 0)
            .map((restaurant) => (
              <RestaurantCard
                url={restaurant.url}
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                hours={restaurant.hours}
                coordinates={restaurant.gps_coord}
              />
            ))}
        </AnimatePresence>
      </div>
      <div className="col-span-12 sm:col-span-4">
        {restaurants
          ?.filter((_, index) => index % 2 == 1)
          .map((restaurant) => (
            <RestaurantCard
              url={restaurant.url}
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              hours={restaurant.hours}
              coordinates={restaurant.gps_coord}
            />
          ))}
      </div>
    </>
  );
}
