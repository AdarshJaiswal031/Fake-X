
import { useEffect } from "react";
import HomeContent from "../components/HomeContent";

export default function Home() {

  const getActiveItems = () => {
    fetch("http://localhost:8000/activeItems")
      .then((response) => response.json())
      .then((data) => {
        setactiveItems(data);
        setisFetching(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getActiveItems();
  }, []);

  return (
    <div className="flex">
      <HomeContent />
    </div>
  );
}
