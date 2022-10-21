import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";

const Carts = () => {
  const { cartProducts, totalItem, totalPrice } = useSelector(
    (state) => state.cart
  );
 
  return (
    <>
      <div className="bg-white py-4 px-4 shadow-md rounded-lg my-4 mx-4">
        {cartProducts.map((product) => (
          <CartItem key={product.id} product={product}></CartItem>
        ))}
        <div className="flex justify-center items-center text-center">
          <div className="text-xl font-semibold">
            <p>Total Item</p>
            <p className="text-5xl">{totalItem}</p>
          </div>
        </div>
      </div>
      <div className="bg-white py-4 px-4 shadow-md rounded-lg my-4 mx-4">
        <div className="flex justify-center items-center text-center">
          <div className="text-xl font-semibold">
            <p>Total Price</p>
            <p className="text-5xl">$ {totalPrice}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carts;
