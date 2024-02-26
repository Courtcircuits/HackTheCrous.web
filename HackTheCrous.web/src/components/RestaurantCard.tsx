import { Link } from "react-router-dom";
import LinkIcon from "../assets/icons/LinkIcon";
import { useRestaurantMeals } from "../queries/restaurant.queries";
import { Meal } from "../types";
import { motion } from "framer-motion";

export default function RestaurantCard({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  const { data: meals, error } = useRestaurantMeals(id);
  if (error) {
    return <p>Something went wrong</p>;
  }
  if (!meals) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="rounded-lg px-5 py-4 bg-tint200 flex flex-col h-fit mb-4"
    >
      <span className="flex flex-row justify-between items-center">
        <h3 className="font-bold text-3xl">{name}</h3>
        <LinkIcon />
      </span>
      <section className="max-h-52 overflow-hidden">
        {meals.map((meal) => (
          <RestaurantMenu key={meal.ID} meal={meal} />
        ))}
      </section>
      <Link className="text-primary mt-3" to={`/restaurant/${id}`}>
        View more
      </Link>
    </motion.div>
  );
}

function RestaurantMenu({ meal }: { meal: Meal }) {
  return (
    <>
      <h4>{meal.Type}</h4>
      {meal.Foodies.map((item, index) => (
        <span key={index}>
          <b className="text-tint900">{item.type}</b>
          <ul>
            {item.content.map((food) => (
              <li className="text-tint900 decoration-tint900" key={food}>
                {food}
              </li>
            ))}
          </ul>
        </span>
      ))}
    </>
  );
}
