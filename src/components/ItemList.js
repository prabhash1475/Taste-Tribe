import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/common";
import { addItem } from "../utils/cartSlice";

const ItemList = ({ items }) => {
  console.log(items);
  const dispatch = useDispatch();
  const handleAdd = (item) => {
    dispatch(addItem(item));
  };
  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="m-2 p-2 border-gray-300 border-b-2 text-left flex justify-between"
        >
          <div className="w-9/12">
            <span className="py-2 font-semibold ">{item.card.info.name}</span>
            <span className="font-semibold block">
              ₹{" "}
              {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
            </span>
            <p className="text-sm text-gray-500">
              {item.card.info.description}
            </p>
          </div>
          <div className="w-3/12 p-4 relative ">
            <img
              className="w-full rounded-md "
              src={
                item?.card?.info?.imageId && CDN_URL + item?.card?.info?.imageId
              }
              alt={item.card.info.imageId}
            />
            <div className="  absolute bottom-5 left-8  w-28 h-6 ">
              <button
                className="bg-white text-green-500 font-semibold rounded-md p-2 ml-6"
                onClick={() => handleAdd(item)}
                // here we are passing the {item} to handleAdd
                // we are passing like this because we want execute handleAdd to when we click on the button
                // if we pass the item directly handleAdd(item) then  it will be executed immediately  after the first render
              >
                {" "}
                Add +1
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
