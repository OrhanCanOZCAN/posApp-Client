import { Button, message } from "antd";
import React from "react";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, increase, decrease, reset } from "../../redux/cartSlice";
import {useNavigate} from "react-router-dom";

const CartTotals = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="cart h-full max-h-[calc(100vh_-_130px)] flex flex-col">
      <h2 className="bg-[#006341] text-center py-4 text-white font-bold tracking-wide">
        Sepetteki Ürünler
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-2 py-1 overflow-y-auto text-center mt-1 text-md text-[#006341] font-semibold">
        {cart.cartItems.length > 0
          ? cart.cartItems.map((item) => (
              <li key={item._id} className="cart-item">
                <div className="flex justify-between">
                  <img
                    src={item.img}
                    alt=""
                    className="w-16 h-16 rounded-lg relative cursor-pointer"
                    onClick={() => {
                      dispatch(deleteCart(item));
                      message.success("Ürün sepetten silindi.");
                    }}
                  />
                  <div className="flex flex-col ml-0">
                    <h1 className="text-md ml-2 ">{item.title}</h1>
                    <span className="flex justify-center items-center">
                      {item.price} ₺ x {item.quantity}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      // type="primary"
                      size="medium"
                      className="w-full flex items-center justify-center rounded-full ml-6 bg-[#006341] text-white"
                      icon={<MinusCircleOutlined />}
                      onClick={() => {
                        if (item.quantity === 1) {
                          if (
                            window.confirm(
                              "Ürünü silmek istediğinize emin misiniz?",
                              message.success("Ürün sepetten silindi.")
                            )
                          ) {
                            dispatch(decrease(item));
                          }
                        }
                        if (item.quantity > 1) {
                          if (
                            window.confirm(
                              "Ürünü silmek istediğinize emin misiniz?"
                            )
                          ) {
                            dispatch(decrease(item));
                          }
                        }
                      }}
                    />
                    <span className="text-lg inline-block w-6 h-8">
                      {item.quantity}
                    </span>
                    <Button
                      // type="primary"
                      size="medium"
                      className="w-full flex items-center justify-center rounded-full bg-[#006341] text-white"
                      icon={<PlusCircleOutlined />}
                      onClick={() => dispatch(increase(item))}
                    />
                  </div>
                </div>
              </li>
            )).reverse()
          : "Sepetinizde hiç ürün yok..."}
      </ul>

      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Ara Toplam</b>
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0} ₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b className="text-[#3f5661]">KDV %{cart.tax}</b>
            <span className="text-[#8c0101]">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}{" "}
              ₺
            </span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b className="text-xl text-[#006341]">Genel Toplam</b>
            <span className="text-xl">
              {cart.total + (cart.total * cart.tax) / 100 > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}{" "}
              ₺
            </span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button
            size="large"
            disabled={cart.cartItems.length === 0}
            className="w-full bg-[#006341] text-white font-bold"
            onClick={()=>navigate("/cart") }
          >
            Sipariş Oluştur
          </Button>
          <Button
            size="large"
            disabled={cart.cartItems.length === 0}
            className="w-full mt-2 flex items-center justify-center bg-[#8c0101] text-white font-bold"
            icon={<ClearOutlined />}
            onClick={() => {
              if (
                window.confirm("Sepeti temizlemek istediğinize emin misiniz?")
              ) {
                dispatch(reset());
                message.success("Sepetiniz başarıyla temizlendi.");
              }
            }}
          >
            Temizle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
