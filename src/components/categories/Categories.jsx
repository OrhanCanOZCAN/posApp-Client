import { AppstoreAddOutlined, FormOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Add from "./Add";
import Edit from "./Edit";
import "./style.css";

const Categories = ({
  categories,
  setCategories,
  getCategories,
  setFiltered,
  products,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("Tüm Ürünler");

  useEffect(() => {
    if (categoryTitle === "Tüm Ürünler") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((item) => item.category === categoryTitle));
    }
  }, [products, setFiltered, categoryTitle]);

  return (
    <ul className="flex gap-1 md:flex-col font-medium">
      {categories?.map((item) => (
        <li
          className={`category-item ${item.title === categoryTitle && "!bg-white !text-[#3f5661] font-bold"}`}
          key={item._id}
          onClick={() => setCategoryTitle(item.title)}
        >
          <span>{item.title}</span>
        </li>
      ))}

      <li
        className="category-item !bg-[#ffa82b] md:text-md flex justify-start gap-2 !text-[#00362e] hover:!bg-[#00362e] hover:!text-[#ffa82b]"
        onClick={() => setIsAddModalOpen(true)}
      >
        <AppstoreAddOutlined className="md:text-2xl flex justify-start" />
        Kategori Ekle
      </li>
      <li
        className="category-item !bg-[#ffa82b] md:text-md flex justify-start gap-2 !text-[#00362e] hover:!bg-[#00362e] hover:!text-[#ffa82b]"
        onClick={() => setIsEditModalOpen(true)}
      >
        <FormOutlined className="md:text-2xl flex justify-start" />
        Kategori Düzenle
      </li>
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        setCategories={setCategories}
        getCategories={getCategories}
      />
      <Edit
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        categories={categories}
        setCategories={setCategories}
        getCategories={getCategories}
      />
    </ul>
  );
};

export default Categories;
