import { useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import useOnlineStatus from "../utils/useOnlineStatus";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [isOpen, setIsOpen] = useState({
    section1: true,
    section2: true,
    section3: true,
    section4: true,
    section5: true,
  });

  const resInfo = useRestaurantMenu(resId);
  const onlineStatus = useOnlineStatus();

  if (onlineStatus) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">You are Offline</h1>
    );
  }

  if (!resInfo) {
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
  } = resInfo?.cards[2]?.card?.card?.info || {};
  // console.log(resInfo?.cards[2]?.card?.card?.info);
  const recommendedMenuList =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
      ?.itemCards || [];

  const title2 =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card
      ?.title || "Second Menu Section";
  const title3 =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card?.card
      ?.title || "Third Menu Section";
  const title4 =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[5]?.card?.card
      ?.title || "Fourth Menu Section";

  const subHeading2List =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card
      ?.itemCards || [];

  const subHeading3List =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card?.card
      ?.itemCards || [];

  const subHeading4List =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[5]?.card?.card
      ?.itemCards || [];

  const toggleAccordion = (section) => {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="p-5 max-w-screen-lg mx-auto bg-gradient-to-br from-green-100 via-yellow-50 to-yellow-100 min-h-screen">
      {/* Restaurant Information Card */}
      <div className="bg-gradient-to-br from-white to-green-100 shadow-lg rounded-lg p-6 mb-6 text-center max-w-lg mx-auto transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br hover:from-green-200 hover:to-yellow-100">
        <div className="flex flex-col md:flex-row items-center justify-center">
          {cloudinaryImageId && (
            <div className="mt-4 md:mr-4 w-full md:w-1/2">
              <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
                alt={name || "Restaurant Image"}
                className="w-full h-48 object-cover rounded-lg shadow-md transform transition duration-500 hover:scale-110"
              />
            </div>
          )}
          <div className="w-full md:w-1/2">
            <h1 className=" text-xl font-bold mb-2 text-green-700">
              {name || "Restaurant Name Not Available"}
            </h1>
            <p className="text-orange-600 font-medium mb-2">
              {cuisines?.join(", ") || "Cuisines Not Available"}
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-4">
              <span className="text-gray-700 text-md">
                {costForTwoMessage || "Cost for Two Not Available"}
              </span>
              <div>
                <span className=" text-md ">
                  {avgRatingString
                    ? `★ ${avgRatingString} `
                    : "Rating Not Available"}
                </span>
                <span className="block text-gray-700">
                  ({totalRatingsString})
                </span>
              </div>
            </div>
            <p className="text-gray-700 font-semibold">Outlet: {locality}</p>
          </div>
        </div>
      </div>
      {/* First Menu Section */}
      {recommendedMenuList?.length ? (
        <div className="menu-section mb-6">
          <div
            className="menu-header flex justify-between items-center bg-green-100 p-4 cursor-pointer rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
            onClick={() => toggleAccordion("section1")}
          >
            <h3 className="text-xl font-bold text-green-600">
              Recommended Menu ({recommendedMenuList.length})
            </h3>
            <span
              className={`menu-toggle transition-transform duration-200 ${
                isOpen.section1 ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </div>
          {isOpen.section1 && (
            <ul className="menu-items divide-y divide-gray-200">
              {recommendedMenuList.map((elem, index) => (
                <li
                  key={index}
                  className="menu-item p-4 flex justify-between items-center hover:bg-gray-50 transition duration-200"
                >
                  <div className="menu-item-left">
                    <span className="font-medium text-lg text-gray-800">
                      {elem?.card?.info?.name || "Item Name Not Available"}
                    </span>
                    <span className="block text-gray-500">
                      RS{" "}
                      {Math.floor(elem?.card?.info?.price / 100) ||
                        Math.floor(elem?.card?.info?.defaultPrice / 100) ||
                        "Price Not Available"}
                    </span>
                  </div>
                  {elem?.card?.info?.imageId && (
                    <img
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${elem?.card?.info?.imageId}`}
                      alt={elem?.card?.info?.name || "Image Not Available"}
                      className="w-16 h-16 object-cover rounded shadow"
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <h3 className="text-center text-lg text-gray-600">
          Recommended Menu Not Available
        </h3>
      )}

      {/* Second Menu Section */}
      {subHeading2List?.length ? (
        <div className="menu-section mb-6">
          <div
            className="menu-header flex justify-between items-center bg-green-100 p-4 cursor-pointer rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
            onClick={() => toggleAccordion("section2")}
          >
            <h3 className="text-xl font-bold text-green-600">
              {title2} ({subHeading2List.length})
            </h3>
            <span
              className={`menu-toggle transition-transform duration-200 ${
                isOpen.section2 ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </div>
          {isOpen.section2 && (
            <ul className="menu-items divide-y divide-gray-200">
              {subHeading2List.map((elem, index) => (
                <li
                  key={index}
                  className="menu-item p-4 flex justify-between items-center hover:bg-gray-50 transition duration-200"
                >
                  <div className="menu-item-left">
                    <span className="font-medium text-lg text-gray-800">
                      {elem?.card?.info?.name || "Item Name Not Available"}
                    </span>
                    <span className="block text-gray-500">
                      RS{" "}
                      {Math.floor(elem?.card?.info?.price / 100) ||
                        Math.floor(elem?.card?.info?.defaultPrice / 100) ||
                        "Price Not Available"}
                    </span>
                  </div>
                  {elem?.card?.info?.imageId && (
                    <img
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${elem?.card?.info?.imageId}`}
                      alt={elem?.card?.info?.name || "Image Not Available"}
                      className="w-16 h-16 object-cover rounded shadow"
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <h3 className="text-center text-lg text-gray-600">
          Second Menu Section Not Available
        </h3>
      )}

      {/* Third Menu Section */}
      {subHeading3List?.length ? (
        <div className="menu-section mb-6">
          <div
            className="menu-header flex justify-between items-center bg-green-100 p-4 cursor-pointer rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
            onClick={() => toggleAccordion("section3")}
          >
            <h3 className="text-xl font-bold text-green-600">
              {title3} ({subHeading3List.length})
            </h3>
            <span
              className={`menu-toggle transition-transform duration-200 ${
                isOpen.section3 ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </div>
          {isOpen.section3 && (
            <ul className="menu-items divide-y divide-gray-200">
              {subHeading3List.map((elem, index) => (
                <li
                  key={index}
                  className="menu-item p-4 flex justify-between items-center hover:bg-gray-50 transition duration-200"
                >
                  <div className="menu-item-left">
                    <span className="font-medium text-lg text-gray-800">
                      {elem?.card?.info?.name || "Item Name Not Available"}
                    </span>
                    <span className="block text-gray-500">
                      RS{" "}
                      {Math.floor(elem?.card?.info?.price / 100) ||
                        Math.floor(elem?.card?.info?.defaultPrice / 100) ||
                        "Price Not Available"}
                    </span>
                  </div>
                  {elem?.card?.info?.imageId && (
                    <img
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${elem?.card?.info?.imageId}`}
                      alt={elem?.card?.info?.name || "Image Not Available"}
                      className="w-16 h-16 object-cover rounded shadow"
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <h3 className="text-center text-lg text-gray-600">
          Third Menu Section Not Available
        </h3>
      )}

      {/* Fourth Menu Section */}
      {subHeading4List?.length ? (
        <div className="menu-section mb-6">
          <div
            className="menu-header flex justify-between items-center bg-green-100 p-4 cursor-pointer rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
            onClick={() => toggleAccordion("section4")}
          >
            <h3 className="text-xl font-bold text-green-600">
              {title4} ({subHeading4List.length})
            </h3>
            <span
              className={`menu-toggle transition-transform duration-200 ${
                isOpen.section4 ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </div>
          {isOpen.section4 && (
            <ul className="menu-items divide-y divide-gray-200">
              {subHeading4List.map((elem, index) => (
                <li
                  key={index}
                  className="menu-item p-4 flex justify-between items-center hover:bg-gray-50 transition duration-200"
                >
                  <div className="menu-item-left">
                    <span className="font-medium text-lg text-gray-800">
                      {elem?.card?.info?.name || "Item Name Not Available"}
                    </span>
                    <span className="block text-gray-500">
                      RS{" "}
                      {Math.floor(elem?.card?.info?.price / 100) ||
                        Math.floor(elem?.card?.info?.defaultPrice / 100) ||
                        "Price Not Available"}
                    </span>
                  </div>
                  {elem?.card?.info?.imageId && (
                    <img
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${elem?.card?.info?.imageId}`}
                      alt={elem?.card?.info?.name || "Image Not Available"}
                      className="w-16 h-16 object-cover rounded shadow"
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <h3 className="text-center text-lg text-gray-600">
          Fourth Menu Section Not Available
        </h3>
      )}
    </div>
  );
};

export default RestaurantMenu;
