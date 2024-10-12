import RestaurantCard, { withVegTag } from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [listOfFilterRestaurants, setListOfFilterRestaurants] = useState([]);
  const [title, setTitle] = useState("");
  const [searchText, setSearchText] = useState("");

  const PureVegRestaurant = withVegTag(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);
  console.log(listOfRestaurants[1]?.info?.isOpen);
  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.51800&lng=88.38320&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setListOfRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
      // json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
      // json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setListOfFilterRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
      // json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
      // json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setTitle(json?.data?.cards[5]?.card?.card?.title);
  }; // sort by sort((a, b) => a.info.sla.deliveryTime - b.info.sla.deliveryTime);
  // console.log(listOfRestaurants.sort((a, b) => a.info.sla.deliveryTime - b.info.sla.deliveryTime));
  const onlineStatus = useOnlineStatus();
  const totalOnlineRes = listOfFilterRestaurants.length;

  // Sorting function to sort by price
  const sortByPrice = () => {
    const sortedList = [...listOfFilterRestaurants].sort((a, b) => {
      const priceA = parseInt(a.info.costForTwo.replace(/\D/g, ""), 10); // Extract number from '₹600 for two'
      const priceB = parseInt(b.info.costForTwo.replace(/\D/g, ""), 10);
      return priceA - priceB; // Sort in ascending order
    });
    setListOfFilterRestaurants(sortedList);
  };

  // Sorting function with delivery Time
  const fastDelivery = () => {
    const sortByDeliveryTime = [...listOfFilterRestaurants].sort(
      (a, b) => a.info.sla.deliveryTime - b.info.sla.deliveryTime
    );
    setListOfFilterRestaurants(sortByDeliveryTime);
  };
  // Veg filter
  const handleVeg = () => {
    const vegItem = listOfRestaurants.filter((elem) => elem?.info?.veg == true);
    setListOfFilterRestaurants(vegItem);
  };

  // Online status
  if (onlineStatus) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">You are Offline</h1>
    );
  }

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between mb-4">
        {/* Search by restaurant name */}
        <div className="flex mb-4 md:mb-0">
          <input
            className="border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search for restaurants..."
          />
          <button
            className="bg-green-500 text-white rounded-r-md px-4 py-2 hover:bg-green-600 transition duration-300"
            onClick={() => {
              const filteredData = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setListOfFilterRestaurants(filteredData);
              setSearchText("");
            }}
          >
            Search
          </button>
        </div>
        {/* Filter by rating */}
        <button
          className="border-[1px] border-gray-700 rounded-3xl px-2 hover:bg-gradient-to-br from-green-300 to-yellow-200 hover:text-gray-400 transition duration-300 text-black active:bg-slate-500"
          onClick={() => {
            const filterList = listOfRestaurants.filter(
              (elem) => elem.info.avgRatingString >= 4.5
            );
            setListOfFilterRestaurants(filterList);
          }}
        >
          Rating 4.5+
        </button>
        {/* FIlter Veg */}
        <button
          className="border-[1px] border-gray-700 rounded-3xl px-2 hover:bg-gradient-to-br from-green-200 to-yellow-200 hover:text-gray-400 transition duration-300 text-black "
          onClick={handleVeg}
        >
          Pure Veg
        </button>
        {/* Filter by price */}
        <button
          className="border-[1px] border-gray-700 rounded-3xl px-2 hover:bg-gradient-to-br from-green-200 to-yellow-200 hover:text-gray-400 transition duration-300 text-black"
          onClick={sortByPrice}
        >
          Sort by Price
        </button>
        {/* Fast Delivery filter */}
        <button
          className="border-[1px] border-gray-700 rounded-3xl px-2 hover:bg-gradient-to-br from-green-200 to-yellow-200 hover:text-gray-400 transition duration-300 text-black"
          onClick={fastDelivery}
        >
          Fast Delivery
        </button>

        <button className="bg-blue-500 text-white cursor-default rounded-md px-4 py-2 hover:bg-blue-600 transition duration-300">
          Online Restaurants: {totalOnlineRes}
        </button>
      </div>
      <div className="p-4 text-2xl text-neutral-900 font-bold">{title}</div>
      {/* Restaurant cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
        {listOfFilterRestaurants.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"rest/" + restaurant.info.id}
            className="inline-block"
          >
            {restaurant?.info?.veg ? (
              <PureVegRestaurant resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} /> || " NO DATA"
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
