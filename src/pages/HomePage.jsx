import Header from "../components/header/Header";
import Categories from "../components/categories/Categories";
import Products from "../components/products/Products";
import CartTotals from "../components/cartTotal/CartTotals";
import { useState, useEffect } from "react";
import { Spin } from "antd";

const HomePage = () => {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const getCategories = async () => {
    try {
      const res = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/categories/get-category"
      );
      const data = await res.json();

      data &&
        setCategories(
          data.map((item) => {
            return { ...item, value: item.title }; // ürün ekleme'de  kategori seç alanında görmek ıcın
          })
        );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all");
        const data = await res.json();

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  
  return (
    <>
      <Header setSearch={setSearch}/>
     {products && categories ? (
       <div className="home px-8 flex md:flex-row flex-col justify-between gap-10 md:pb-0 p-26 h-screen">
       <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-64">
         <Categories
           categories={categories}
           setCategories={setCategories}
           getCategories={getCategories}
           setFiltered={setFiltered}
           products={products}
         />
       </div>
       <div className="products flex-[6] max-h-[calc(100vh_-_112px)] overflow-y-auto pb:10">
         <Products
           categories={categories}
           filtered={filtered}
           products={products}
           setProducts={setProducts}
           search={search}
         />
       </div>
       <div className="cartTotal min-w-[350px] md:-mr-[20px] border ">
         <CartTotals />
       </div>
     </div>
     ): (<Spin size="large" className="absolute h-screen w-screen top-1/2 flex justify-center"/>)}
    </>
  );
};

export default HomePage;
