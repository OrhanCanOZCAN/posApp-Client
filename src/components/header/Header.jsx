import React from "react";
import { Input, Badge, message } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ setSearch }) => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logOut = () => {
    if (window.confirm("Çıkış yapmak istediğinize emin misiniz ?")) {
      localStorage.removeItem("postUser");
      navigate("/login");
      message.success("Çıkış başarılı");
    }
  };

  return (
    <div className="border-b mb-6">
      <header className="py-4 px-12 flex justify-center items-center gap-10">
        <div className="logo">
          <Link to="/">
            {/* <h2 className="text-4xl font-semibold md:text-6xl text-[#3f5661]">
              LOGO
            </h2> */}
            <img src="/images/starbucks.png" alt="" width={75} />
          </Link>
        </div>
        <div
          className="header-search flex-1 flex justify-center items-center"
          onClick={() => {
            pathname !== "/" && navigate("/");
          }}
        >
          <Input
            size="large size"
            placeholder="Ürün Ara"
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div
          className="menu-links flex justify-between items-center gap-10 md:static fixed z-50 bottom-0 
        md:w-auto w-screen md:bg-transparent bg-white left-0 md:border-t-0 border-t md:px-0 px-4 py-1"
        >
          <Link
            to={"/"}
            className="menu-link flex flex-col items-center text-[#006341] hover:text-[#fdb912] transition-all"
          >
            <HomeOutlined className="text-2xl" />
            <span className="text-[#006341] md:text-sm text-[30px]">
              Anasayfa
            </span>
          </Link>
          <Badge
            count={cart.cartItems.length}
            offset={[0, 0]}
            className="md:flex sm:hidden"
          >
            <Link
              to={"/cart"} // sayfanın yenılenmemesı ıcın lınk to kullanıyoruz //
              className="menu-link flex flex-col items-center text-[#006341] hover:text-[#fdb912] transition-all"
            >
              <ShoppingCartOutlined className="text-2xl" />
              <span className="text-[#006341] md:text-sm text-[30px] ">
                Sepet
              </span>
            </Link>
          </Badge>
          <Link
            to={"/bills"}
            className={`flex flex-col items-center text-[#006341] hover:text-[#fdb912] transition-all ${pathname === "/bills" && "active"}`}
          >
            <CopyOutlined className="text-2xl" />
            <span className="text-[#006341] md:text-sm text-[30px]">
              Faturalar
            </span>
          </Link>
          <Link
            to={"/customers"}
            className="menu-link flex flex-col items-center text-[#006341] hover:text-[#fdb912] transition-all"
          >
            <UserOutlined className="text-2xl" />
            <span className="text-[#006341] md:text-sm text-[30px]">
              Müşteriler
            </span>
          </Link>
          <Link
            to={"/statics"}
            className="menu-link flex flex-col items-center text-[#006341] hover:text-[#fdb912] transition-all"
          >
            <BarChartOutlined className="text-2xl" />
            <span className=" text-[#006341] md:text-sm text-[30px]">
              İstatistikler
            </span>
          </Link>
          <div onClick={logOut}>
            <Link className="menu-link flex flex-col items-center text-[#006341] hover:text-[#fdb912] transition-all">
              <LogoutOutlined className="text-2xl" />
              <span className=" text-[#006341] md:text-sm text-[30px]">
                Çıkış
              </span>
            </Link>
          </div>
        </div>
        <Badge
          count={cart.cartItems.length}
          offset={[0, 0]}
          className="md:hidden flex"
        >
          <Link
            to={"/"}
            className="menu-link flex flex-col items-center text-[#006341] hover:text-[#fdb912] transition-all"
          >
            <ShoppingCartOutlined className="text-2xl" />
            <span className="text-[#006341] md:text-xs text-[20px]">Sepet</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
};

export default Header;
