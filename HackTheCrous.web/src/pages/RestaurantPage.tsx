import { useParams } from "react-router-dom";

export default function RestaurantPage() {
  const { id } = useParams<{ id: string }>();
  return <h2>Restaurant {id}</h2>;
}
