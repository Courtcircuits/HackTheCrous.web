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
      data: Restaurant[] | undefined,
    ): Restaurant[] => {
      if (!data) return [];
      if (selectedFilters.length === 0) {
        return data;
      }
      return data?.filter((restaurant) => {
        let contains = false;
        for (let i = 0; i < selectedFilters.length; i++) {
          contains = contains || restaurant.attributes.name.includes(selectedFilters[i]);
        }
        return contains;
      });
    };
    setRestaurants(fitlerRestaurants(data?.data));
  }, [data, restaurants, selectedFilters]);

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <>
      <div className="col-span-12 md:col-span-10 sm:col-span-10 flex flex-row">
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
      <div className="col-span-12 sm:col-span-5 md:col-span-5">
        <AnimatePresence initial={false}>
          {restaurants
            ?.filter((_, index) => index % 2 == 0)
            .map((restaurant) => (
              <RestaurantCard
                url={restaurant.attributes.url}
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.attributes.name}
                hours={restaurant.attributes.hours}
              />
            ))}
        </AnimatePresence>
      </div>
      <div className="col-span-12 sm-col-span-5 md:col-span-5">
        {restaurants
          ?.filter((_, index) => index % 2 == 1)
          .map((restaurant) => (
            <RestaurantCard
              url={restaurant.attributes.url}
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.attributes.name}
              hours={restaurant.attributes.hours}
            />
          ))}
      </div>
    </>
  );
}
