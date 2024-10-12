import { useState, useEffect } from "react";
import { MENU_API_KFC } from "./common";

const useRestaurantMenu = (resID) => {
  const [resInfo, setResInfo] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let data = await fetch(MENU_API_KFC + resID);
    let json = await data.json();
    setResInfo(json?.data);
  };
  return resInfo;
};
export default useRestaurantMenu;
