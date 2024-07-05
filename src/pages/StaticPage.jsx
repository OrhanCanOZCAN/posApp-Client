import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import StaticsCard from "../components/statics/StaticsCard";
import { Area, Pie } from "@ant-design/plots";
import { Spin } from "antd";

const StaticPage = () => {
  const [data, setData] = useState();
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("postUser"));

  useEffect(() => {
    asyncFetch();
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

  const asyncFetch = () => {
    fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/get-bills")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("Hay aksi bir şeyler ters gitti.", error);
      });
  };

  const config = {
    data: data,
    xField: "customerName",
    yField: "totalAmount",
    xAxis: {
      range: [0, 1],
    },
  };
  const config2 = {
    data: data,
    angleField: "totalAmount",
    colorField: "customerName",
    paddingRight: 100,
    innerRadius: 0.6,
    label: {
      text: "totalAmount",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
    annotations: [
      {
        type: "text",
        style: {
          text: "Toplam\nSatış ",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 25,
          fontStyle: "bold",
        },
      },
    ],
  };
  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.totalAmount + total, 0);
    return `${amount.toFixed(2)} ₺`;
  };

  return (
    <>
      <Header />
      <h1 className="font-bold text-center text-3xl mb-12 mt-12 text-[#006341]">
          İSTATİSTİKLER
        </h1>
      {data ? (
        <div className="px-8 md:pb-0 pb-20">
       
        <div className="statics-section">
          <h2 className="text-lg">
            Kullanıcı:{" "}
            <span className="text-[#006341] font-bold text-xl">
              {user.username}
            </span>
          </h2>
          <div className="statics-cards grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 my-1  md:gap-8 gap-2">
            <StaticsCard
              title={"Müşteriler"}
              amount={data?.length}
              img={"./images/admin.png"}
            />
            <StaticsCard
              title={"Kazanç Miktarı"}
              amount={totalAmount()}
              img={"./images/cashicon.jpeg"}
            />

            <StaticsCard
              title={"Satış Miktarı (adet)"}
              amount={data?.length}
              img={"./images/finance.png"}
            />
            <StaticsCard
              title={"Ürünler (adet)"}
              amount={products?.length}
              img={"./images/product.png"}
            />
          </div>
          <div className="fle justify-between">
            <div>
              <div className="flex justify-between gap-10 lg:flex-row flex-col">
                <div className="lg:w-1/2 lg:h-full h-72 mb-14 items-center">
                  <Area {...config} />
                </div>
                <div className="lg:w-1/2 lg:h-full h-72 items-center">
                  {" "}
                  <Pie {...config2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ):(<Spin size="large" className="absolute h-screen w-screen top-1/2 flex justify-center"/>)}
    </>
  );
};
export default StaticPage;
