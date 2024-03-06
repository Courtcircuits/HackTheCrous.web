import { useParams, useSearchParams } from "react-router-dom";
import { useRestaurant } from "../queries/restaurant.queries";
import { Meal } from "../types";

export default function RestaurantPage() {
  const { id } = useParams<{ id: string }>();
  const { restaurant, metadataError, mealsError } = useRestaurant(Number(id));
  if (metadataError || mealsError) {
    return <p>Something went wrong</p>;
  }
  if (!restaurant) {
    return null;
  }

  return (
    <div className="col-span-8">
      <span className="flex flex-row-reverse sm:flex-row items-center">
        <div className="hidden sm:block bg-gradient-to-r from-limeGreen to-primary rounded-full w-10 h-10 mt-4"></div>
        <h2 className="text-tint900 text-6xl font-extrabold sm:ml-5">
          {restaurant.name}
        </h2>
      </span>
      {restaurant.meals.length > 0 ? (
        restaurant.meals.map((meal) => (
          <RestaurantMenu key={meal.ID} meal={meal} />
        ))
      ) : (
        <p>No meals available</p>
      )}
    </div>
  );
}

function RestaurantMenu({ meal }: { meal: Meal }) {
  const [searchParams] = useSearchParams();
  return (
    <>
      <h3 className="font-clean font-semibold text-4xl mt-5 mb-3">
        {meal.Type}
      </h3>
      {meal.Foodies.map((item, index) => (
        <span key={index}>
          <h4 className="text-tint900 font-clean text-2xl uppercase my-2">
            {item.type}
          </h4>
          <ul>
            {item.content.map((food) => {
              const substringMatchingQuery = food
                .toUpperCase()
                .indexOf(searchParams.get("q")?.toUpperCase() || "");
              let left = "";
              let matching = "";
              let right = "";

              if (substringMatchingQuery !== -1) {
                left = food.slice(0, substringMatchingQuery);
                matching = food.slice(
                  substringMatchingQuery,
                  substringMatchingQuery + (searchParams.get("q")?.length || 0)
                );
                right = food.slice(
                  substringMatchingQuery + (searchParams.get("q")?.length || 0)
                );
              } else {
                left = food;
              }

              return (
                <li
                  className="text-tint900 decoration-tint900 font-clean text-md"
                  key={food}
                >
                  {left}
                  <span className="text-primary">{matching}</span>
                  {right}
                </li>
              );
            })}
          </ul>
          <hr className="text-offwhite my-5 w-1/3" />
        </span>
      ))}
    </>
  );
}
