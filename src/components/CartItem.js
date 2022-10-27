import React from "react";
import { useDispatch } from "react-redux";
import { decrement, increment, remove } from "../features/cart/cartSlice";

const CartItem = ({ product }) => {
  const { id, title, price, quantity, totalQuantity, moq } = product;
  const dispatch = useDispatch();

  const handleIncrement = (id, title, price, totalQuantity, moq) => {
    if (totalQuantity > 0) {
      dispatch(increment({ id, title, price, totalQuantity, moq }));
    }
  };

  const handleDecrement = (id, title, price, quantity, moq) => {
    if (quantity > moq) {
      dispatch(decrement({ id, title, price, moq }));
    } else {
      dispatch(remove({ id, price, quantity }));
    }
  };

  const handleRemove = (id, price, quantity) => {
    dispatch(remove({ id, price, quantity }));
  };

  return (
    <div className="flex justify-between border-b-2 mb-2">
      <div className="text-lg py-2">
        <p>{title}</p>
      </div>
      <div className="text-lg py-2">
        <div className="flex flex-row space-x-2 w-full items-center rounded-lg">
          <button
            onClick={() => handleDecrement(id, title, price, quantity, moq)}
            className="focus:outline-none bg-purple-700 hover:bg-purple-800 text-white font-bold py-1 px-1 rounded-full inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 12H6"
              />
            </svg>
          </button>
          <p>{quantity}</p>
          <button
            onClick={() =>
              handleIncrement(id, title, price, totalQuantity, moq)
            }
            className="focus:outline-none bg-purple-700 hover:bg-purple-800 text-white font-bold py-1 px-1 rounded-full inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
          <button
            onClick={() => handleRemove(id, price, quantity)}
            className="focus:outline-none bg-red-700 text-xs hover:bg-red-800 text-white font-bold py-1 px-1.5  rounded-full inline-flex items-center"
          >
            <i className="ri-delete-bin-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
