import { message } from "antd";
import { addProduct} from "../../redux/cartSlice";
import { useDispatch } from "react-redux";

const ProductItem = ({ item }) => {

  // const cart = useSelector((state)=> state.cart)
  const  dispatch = useDispatch();

  const handleClick =()=> {
   dispatch(addProduct({...item, quantity:1}));
   message.success("Ürün sepete eklendi.")
  }

 
  return (
    <div className="product-item border hover:shadow-xl cursor-pointer" onClick={handleClick}>
      <div className="product-img">
        <img
          src={item.img}
          alt=""
          width={100}
          className="h-26 object-cover w-full border-b"
        />
      </div>
      <div className="product-info flex flex-col">
        <span className="font-semibold ml-2 text-[#006341]">{item.title}</span>
        {/* <span className="mt-1">Karamel ve Waffle Aromalı Sütlü Kahve</span> */}

        <span className="flex justify-end items-end mt-4 font-semibold text-md text-[#006341]">
          {item.price} ₺
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
