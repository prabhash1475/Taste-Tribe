import { CDN_URL } from "../utils/common";

const RestaurantCard = (props) => {
  const { resData } = props;

  const {
    name,
    cuisines,
    costForTwo,
    avgRatingString,
    sla,
    cloudinaryImageId,
  } = resData?.info;

  // console.log(costForTwo);
  return (
    <div
      className="bg-gradient-to-br from-white to-green-100 shadow-lg rounded-lg w-64 mx-auto transition-transform duration-300 hover:scale-105 hover:shadow-2xl  hover:bg-gradient-to-br hover:from-green-200 hover:to-yellow-200 relative flex flex-col overflow-hidden group"
      // className="bg-white shadow-lg rounded-lg w-64 mx-auto transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-orange-100 relative flex flex-col overflow-hidden group"
      style={{ height: "360px" }}
    >
      {/* Image Section */}
      <div className="relative h-40 w-full flex-shrink-0">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={CDN_URL + cloudinaryImageId}
          alt={name}
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between p-4 h-full">
        {/* Restaurant Name */}
        <h3 className="text-lg font-semibold mt-2 truncate transition-all duration-1000  group-hover:whitespace-normal group-hover:overflow-hidden group-hover:max-h-12 ease-in hover:text-blue-600">
          {name}
        </h3>

        {/* Cuisines */}
        <h5 className="text-sm text-gray-600 mt-1 truncate group-hover:whitespace-normal transition-all duration-500 ease-in group-hover:max-h-20 overflow-hidden opacity-100 group-hover:opacity-100">
          {cuisines.join(", ")}
        </h5>

        {/* Pricing and Rating */}
        <div className="flex justify-between items-center mt-2">
          <h5 className="text-sm text-gray-700 capitalize">{costForTwo}</h5>
          <h5 className="bg-green-500 text-white px-2 py-1 rounded-lg text-sm">
            {avgRatingString} ★
          </h5>
        </div>

        {/* Delivery Time */}
        <h5 className="text-right text-sm text-gray-900 mt-2">
          {sla.slaString}{" "}
          <span className="text-sky-500 ml-1 font-semibold inline-block -rotate-45 transition-transform duration-500 ease-in-out group-hover:translate-y-1">
            ➤
          </span>
        </h5>
      </div>
    </div>
  );
};

export default RestaurantCard;

// Higher Order Components

export const withVegTag = (RestaurantCard) => {
  return (props) => (
    <div className="relative">
      {/* Pure Veg Label */}
      <div className="absolute top-1 left-2 bg-gradient-to-r from-green-100 via-green-400 to-green-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg z-10 transition-transform transform hover:scale-105 hover:rotate-3">
        <span className="text-lg font-bold">🌱</span> Pure Veg
      </div>

      {/* Render the RestaurantCard Component */}
      <RestaurantCard {...props} />
    </div>
  );
};
