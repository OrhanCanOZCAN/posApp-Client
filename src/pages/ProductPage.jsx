import React from "react";
import Header from ".././components/header/Header";
import Edit from "../components/products/Edit";

const ProductPage = () => {
  return (
    <>
      <Header />
      <div className="px-8">
        <h1 className="font-bold text-center text-3xl mb-12 mt-12 text-[#006341]">
          ÜRÜN İŞLEMLERİ
        </h1>
        <Edit />
      </div>
    </>
  );
};

export default ProductPage;
