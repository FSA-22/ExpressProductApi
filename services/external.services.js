import axios from "axios";

/**
 * Fetch and map external product data
 */
export const fetchExternalProducts = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/todos/1",
  );

  return data.map((item) => ({
    name: item.title,
    description: item.description,
    price: item.price,
    size: "N/A",
    imageUrl: item.image,
  }));
};
