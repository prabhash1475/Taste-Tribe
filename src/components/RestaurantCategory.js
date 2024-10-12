import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  // const [showItems, setShowItems] = useState(false);

  const handleToggle = () => {
    console.log("Click");
    // setShowItem(!showItem);
    setShowIndex();
 
  };
  return (
    <div>
      {/* Accordian Header */}
      <div className="w-6/12 bg-gray-100 shadow-xl m-auto p-4 my-2  rounded-sm ">
        <div
          className="flex justify-between cursor-pointer border-b-2 "
          onClick={handleToggle}
        >
          <span className=" font-bold text-lg ">
            {data?.title} ({data.itemCards.length})
          </span>
          {showItems && <span>⬆️</span>}
          {!showItems && <span>⬇️</span>}
        </div>
        {showItems && <ItemList items={data.itemCards} />}
      </div>
      {/* Accordian Body */}
    </div>
  );
};
export default RestaurantCategory;
