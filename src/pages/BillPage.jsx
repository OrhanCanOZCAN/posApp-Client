import Header from "../components/header/Header";
import { Table, Input, Space, Button } from "antd";
import { useState, useEffect, useRef } from "react";
import PrintBill from "../components/bills/PrintBill";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const BillPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchInput = useRef(null);
  const [billItems, setBillItems] = useState();
  const [customer, setCustomer] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

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

  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/get-bills");
        const data = await res.json();
        setBillItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBills();
  }, []);

  const colums = [
    {
      title: "Müşteri Adı",
      dataIndex: "customerName",
      key: "customerName",
      ...getColumnSearchProps("customerName"),
    },
    {
      title: "Telefon",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Adres",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ödeme Yöntemi",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      ...getColumnSearchProps("paymentMethod"),
    },
    {
      title: "Sipariş Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <span>{text.substring(0, 10)}</span>;
      },
    },
    {
      title: "Toplam Fiyat",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => {
        return <span>{text} ₺</span>;
      },
      sorter: (a, b) => a.totalAmount - b.totalAmount,
    },
    {
      title: "FATURA", //  form içindeki ınput'a button koymak //
      render: (_, record) => (
        <Button
          type="link"
          className="bg-[#006341] text-white rounded-lg"
          size="medium"
          htmlType="submit"
          onClick={() => {
            setIsModalOpen(true);
            setCustomer(record);
          }}
        >
          Fatura Yazdır
        </Button>
      ),
    },
  ];
  return (
    <>
      <Header />
      <h1 className="font-bold text-center text-3xl mb-12 mt-12 text-[#006341]">
        FATURALAR
      </h1>
      {billItems ? (
        <div className="px-8">
          <Table
            dataSource={billItems}
            columns={colums}
            bordered
            pagination={false}
            scroll={{
              x: 1000,
              y: 500,
            }}
            rowKey="_id"
          />
          {/* <div className="cart-total flex justify-end mt-10">
          <Card className="w-72">
            <Button
              className="mt-6 w-full bg-[#006341] text-white rounded-xl"
              size="large"
              onClick={() => setIsModalOpen(true)}
            >
              Yazdır
            </Button>
          </Card>
        </div> */}
        </div>
      ) : (
        <Spin
          size="large"
          className="absolute h-screen w-screen top-1/2 flex justify-center"
        />
      )}
      <PrintBill
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        customer={customer}
      />
    </>
  );
};

export default BillPage;
