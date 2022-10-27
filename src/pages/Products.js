import React from "react";
import ProductItem from "../components/ProductItem";

const productsData = [
  {
    id: 1,
    title: "Asus Vivobook X515MA",
    price: 35500,
    totalQuantity: 20,
    moq: 2,
  },
  {
    id: 2,
    title: "Dell E1916HV 18.5 Inch",
    price: 9300,
    totalQuantity: 35,
    moq: 6,
  },
  {
    id: 3,
    title: "Canon Eos 4000D 18MP",
    price: 36500,
    totalQuantity: 72,
    moq: 4,
  },
];

const Products = () => {
  return (
    <>
      {productsData.map((product) => (
        <ProductItem key={product.id} product={product}></ProductItem>
      ))}
    </>
  );
};

export default Products;
