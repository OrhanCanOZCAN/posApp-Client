import { useState } from "react";
import ProductItem from "./ProductItem";
import { AppstoreAddOutlined, FormOutlined } from "@ant-design/icons";
import Add from "./Add";
import { useNavigate } from "react-router-dom";

const Products = ({ categories, filtered, products, setProducts, search }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="products-wrapper  grid grid-cols-card gap-3">
      {filtered
        .filter((product) => product.title.toLowerCase().includes(search))
        .map((item) => (
          <ProductItem item={item} key={item._id} />
        ))}
      <div
        className="product-item border text-center text-md font-semibold hover:shadow-xl cursor-pointer bg-[#ffa82b] !text-[#00362e] hover:!bg-[#00362e] hover:!text-[#ffa82b]"
        onClick={() => setIsAddModalOpen(true)}
      >
        <AppstoreAddOutlined className="md:text-3xl flex justify-center items-center mt-24" />
        Ürün Ekle
      </div>
      <div
        className="product-item border text-center text-md font-semibold hover:shadow-xl cursor-pointer bg-[#ffa82b] !text-[#00362e] hover:!bg-[#00362e] hover:!text-[#ffa82b]"
        onClick={() => navigate("/product")}
      >
        <FormOutlined className="md:text-3xl flex justify-center items-center mt-24 min-[300px]" />
        Ürün Düzenle
      </div>
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        products={products}
        setProducts={setProducts}
      />
    </div>
  );
};

export default Products;
