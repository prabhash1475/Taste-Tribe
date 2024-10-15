import { useDispatch, useSelector } from "react-redux";
// import ItemList from "./ItemList";
import { clearCart, removeItem } from "../utils/cartSlice";
import { Link } from "react-router-dom";
import { CDN_URL } from "../utils/common";

const Cart = () => {
  const cartItem = useSelector((store) => store.cart.items);
  //   console.log(cartItem[0].card.info.price);
  var totalPrice = 0;
  for (let i = 0; i < cartItem.length; i++) {
    totalPrice += cartItem[i].card.info.price / 100;
  }
  console.log(totalPrice);

  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };
  return (
    <div className=" m-4 p-4 text-center">
      <h1 className="font-bold text-xl">Cart</h1>
      {cartItem.length === 0 && (
        <>
          {" "}
          <h1 className="p-2 text-2xl">Add some item</h1>
          <Link to="/">
            {" "}
            <button className="bg-zinc-100 text-blue-700 underline text-lg p-2">
              Go to Product Page
            </button>
          </Link>
        </>
      )}

      <div className="w-6/12 m-auto">
        <button
          className="bg-black rounded-lg text-white p-2"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
        {cartItem.map((item) => (
          <div
            key={item.card.info.id}
            className="m-2 p-2 border-gray-300 border-b-2 text-left flex justify-between"
          >
            <div className="w-9/12">
              <span className="py-2 font-semibold ">{item.card.info.name}</span>
              <span className="font-semibold block">
                ₹{" "}
                {item.card.info.price / 100 ||
                  item.card.info.defaultPrice / 100}
              </span>
              <p className="text-sm text-gray-500">
                {item.card.info.description}
              </p>
            </div>
            <div className="w-3/12 p-4 relative">
              <img
                className="w-full rounded-md"
                src={
                  item?.card?.info?.imageId &&
                  CDN_URL + item?.card?.info?.imageId
                }
                alt={item.card.info.imageId}
              />
              <div className="absolute bottom-5 left-8 w-28 h-6">
                <button
                  className="bg-red-500 text-white font-semibold rounded-md p-2 ml-6"
                  onClick={() => handleRemove(item)} // Remove item on click
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Cart;
