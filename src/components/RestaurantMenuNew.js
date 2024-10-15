import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useState } from "react";

import Shimmer from "./Shimmer";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenuNew = () => {
  const { resId } = useParams();
  //   console.log(resId);
  const [showIndex, setShowIndex] = useState(null);
  const restaurantInfo = useRestaurantMenu(resId);
  //   console.log(restaurantInfo);

  if (restaurantInfo == null) {
    return <Shimmer />;
  }
  const {
    name,
    locality,
    avgRatingString,
    totalRatingsString,
    costForTwoMessage,
    cuisines,
    cloudinaryImageId,
  } = restaurantInfo?.cards[2]?.card?.card?.info || {};

  const itemCards =
    restaurantInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
      ?.card?.itemCards;

  const categories =
    restaurantInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  //   console.log(categories);
  return (
    <div className="text-center">
      <h1 className="font-bold text-xl my-6">{name}</h1>
      <h5 className="font-bold text-lg">
        <span> {cuisines.join(", ")} </span>
        {"   "}
        <span className="capitalize"> {costForTwoMessage}</span>
      </h5>
      {categories.map((category, index) => (
        <RestaurantCategory
          key={index}
          data={category?.card?.card}
          showItems={index === showIndex} //* Open only the currently selected accordion
          // here we are setting index if index =show index then we make it null and if null make it index
          // This logic checks if the current index is already open (index === showIndex).
          //  If it is, it sets the showIndex to null to close the accordion. Otherwise,
          //  it sets the showIndex to the clicked index to open that specific accordion section.
          setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenuNew;
