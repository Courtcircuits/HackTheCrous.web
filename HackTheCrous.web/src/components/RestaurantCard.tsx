import { Link } from "react-router-dom";
import LinkIcon from "../assets/icons/LinkIcon";
import { useRestaurantMeals, useSchoolsForRestaurant } from "../queries/restaurant.queries";
import { Meal } from "../types";
import { motion } from "framer-motion";
import OpenningHourIndicator from "./OpenningHourIndicator";
import SchoolTag from "./SchoolTag";

export default function RestaurantCard({
  id,
  name,
  url,
  hours,
}: {
  id: number;
  name: string;
  url: string;
  hours: string;
}) {
  const { data: meals, error, isLoading } = useRestaurantMeals(id);
  const { data: schools } = useSchoolsForRestaurant(id);
  if (error) {
    return <p>Something went wrong</p>;
  }
  if (isLoading) {
    return (
      <motion.div
        key={id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="rounded-lg px-5 py-4 bg-tint200 flex flex-col h-fit mb-4 w-full"
      >
        <span className="flex flex-row justify-between items-center">
          <h3 className="font-bold text-3xl">{name}</h3>
          <a href={url} target="_blank" rel="noreferrer">
            <LinkIcon />
          </a>
        </span>
        <section className="max-h-52 overflow-hidden text-fade">
          <p>Loading...</p>
        </section>
      </motion.div>
    );
  }

  if (!meals) {
    return (
      <motion.div
        key={id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="rounded-lg px-5 py-4 bg-tint200 flex flex-col h-fit mb-4 w-full"
      >
        <span className="flex flex-row justify-between items-center">
          <h3 className="font-bold text-3xl">{name}</h3>
          <a href={url} target="_blank" rel="noreferrer">
            <LinkIcon />
          </a>
        </span>
        <OpenningHourIndicator hours={hours} />
        <section className="max-h-52 overflow-hidden">
          <p className="font-bold pb-2">:( Pas de menu indiqué par le CROUS</p>
        </section>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="rounded-lg px-5 py-4 bg-tint200 flex flex-col h-fit mb-4 w-full"
    >
      <span className="flex flex-row justify-between items-center">
        <h3 className="font-bold text-3xl">{name}</h3>
        <a href={url} target="_blank" rel="noreferrer">
          <LinkIcon />
        </a>
      </span>
      <h4 className="font-bold text-1xl">Menu :</h4>
      <section className="max-h-52 overflow-hidden text-fade">
        {meals.length > 0 ? (
          meals.map((meal) => <RestaurantMenu key={meal.id} meal={meal} />)
        ) : (
          <p>No meals available</p>
        )}
      </section>
      <h4 className="font-bold text-1xl">Infos :</h4>
      <div className="flex flex-row flex-wrap p-0 my-2 gap-2">
        <OpenningHourIndicator hours={hours} />
        {schools && schools.length > 0 ? schools.map((school) => <SchoolTag key={school.school_name} school={school.school_name} />) : null}
      </div>
      <Link className="text-primary mt-3" to={`/restaurant/${id}`}>
        View more
      </Link>
    </motion.div>
  );
}

function RestaurantMenu({ meal }: { meal: Meal }) {
  return (
    <>
      <h4>{meal.type}</h4>
      {meal.foodies.map((item, index) => (
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
