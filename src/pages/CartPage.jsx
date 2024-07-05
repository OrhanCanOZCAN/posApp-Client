import Header from "../components/header/Header";
import { Card, Popconfirm, Table, Input, Space } from "antd";
import Highlighter from "react-highlight-words";
import { Button, message } from "antd";
import { useRef, useState } from "react";
import CreateBill from "../components/cartTotal/CreateBill";
import { useSelector, useDispatch } from "react-redux";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { deleteCart, increase, decrease } from "../redux/cartSlice";

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Ara ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            className="bg-[#006341] text-white"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Ara
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Temizle
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrele
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Kapat
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#006341" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#006341",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const colums = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      width: "120px",
      render: (text) => {
        return <img src={text} alt="" className="w-30 h-30" />;
      },
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
      className: "font-semibold text-[#006341]",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
      className: "font-semibold text-[#006341]",
      ...getColumnSearchProps("category"),
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: "price",
      className: "font-semibold text-[#006341]",
      render: (text) => {
        return <span>{text.toFixed(2)} ₺</span>;
      },
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Ürün Adedi",
      dataIndex: "quantity",
      key: "quantity",
      className: "font-semibold text-[#006341]",
      render: (text, record) => {
        return (
          <div className=" flex justify-start items-center text-center gap-2 mflex-[6] max-h-[calc(100vh_-_112px)] overflow-y-auto pb:10">
            <Button
              // type="primary"
              size="medium"
              className=" flex items-center justify-center rounded-full ml-6 bg-[#006341] text-white"
              icon={<MinusCircleOutlined />}
              onClick={() => {
                if (record.quantity === 1) {
                  if (
                    window.confirm(
                      "Ürünü silmek istediğinize emin misiniz?",
                      message.success("Ürün sepetten silindi.")
                    )
                  ) {
                    dispatch(decrease(record));
                  }
                }
                if (record.quantity > 1) {
                  if (
                    window.confirm("Ürünü silmek istediğinize emin misiniz?")
                  ) {
                    dispatch(decrease(record));
                  }
                }
              }}
            />
            <span className="text-lg inline-block w-6 h-8">
              {record.quantity}
            </span>
            <Button
              // type="primary"
              size="medium"
              className="w-full flex items-center justify-center rounded-full bg-[#006341] text-white"
              icon={<PlusCircleOutlined />}
              onClick={() => dispatch(increase(record))}
            />
          </div>
        );
      },
    },
    {
      title: "Toplam Fiyat",
      dataIndex: "price",
      key: "price",
      className: "font-semibold text-[#006341]",
      render: (text, record) => {
        return <span>{(record.quantity * record.price).toFixed(2)} ₺</span>;
      },
    },
    {
      title: "Actions",
      className: "font-semibold text-[#006341]",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Silmek istediğinize emin misiniz?"
            onConfirm={() => {
              dispatch(deleteCart(record));
              message.success("Ürün sepetten silindi.");
            }}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button type="link" className="font-bold" danger>
              Sil
            </Button>
          </Popconfirm>
        );
      },
    },

    // {
    //   title: "FATURA", //  form içindeki ınput'a button koymak //
    //   render: (record) => (
    //     <Button
    //       className="mt-6 bg-[#006341] text-white rounded-xl"
    //       size="medium"
    //       onClick={() => setIsModalOpen(true)}
    //       htmlType="submit"
    //     >
    //       Fatura Oluştur
    //     </Button>
    //   ),
    // },
  ];
  return (
    <>
      <Header />
      <div className="px-20 ">
        <h1 className="font-bold text-center text-3xl mb-10 text-[#006341] ">
          SİPARİŞLER
        </h1>
        <div className="max-h-[calc(100vh_-_430px)] flex flex-col overflow-auto">
          <Table
            dataSource={cart.cartItems}
            columns={colums}
            bordered
            pagination={false}
            scroll={{
              x: 1200,
              y: 375,
            }}
          />
        </div>
        <div className="cart-total flex justify-end mt-1">
          <Card className="w-72 ">
            <div className="flex justify-between text-[#3f5661]">
              <span>Ara Toplam:</span>
              <span>{cart.total > 0 ? cart.total.toFixed(2) : 0} ₺</span>
            </div>
            <div className="flex justify-between text-red-700 my-2">
              <span>KDV %{cart.tax}</span>
              <span>
                {(cart.total * cart.tax) / 100 > 0
                  ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                  : 0}{" "}
                ₺
              </span>
            </div>
            <div className="flex justify-between font-bold text-[#3f5661]">
              <span>TOPLAM:</span>
              <span>
                {cart.total + (cart.total * cart.tax) / 100 > 0
                  ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                  : 0}{" "}
                ₺
              </span>
            </div>
            <Button
              className="mt-6 w-full bg-[#006341] text-white rounded-xl"
              size="large"
              onClick={() => setIsModalOpen(true)}
              disabled={cart.cartItems.length === 0}
            >
              Sipariş Oluştur
            </Button>
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default CartPage;
