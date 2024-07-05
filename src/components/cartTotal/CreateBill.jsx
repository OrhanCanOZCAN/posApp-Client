import { Modal, Form, Input, Select, Card, Button,message } from "antd";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {reset} from "../../redux/cartSlice"

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/add-bill", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          subTotal: cart.total,
          tax: ((cart.total * cart.tax) / 100).toFixed(2),
          totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
          cartItems: cart.cartItems,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (res.status === 200) {
        message.success("Fatura oluşturuldu.");
        dispatch(reset());
        navigate("/bills");
      }
    } catch (error) {
      message.danger("Bir şeyler yanlış gitti.");
      console.log(error);
    }
  };
  
  return (
    <Modal
      title="Fatura Oluştur"
      className="text-[#006341]"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}

      //   onOk={handleOk} onCancel={handleCancel}
    >
      <Form layout={"vertical"} onFinish={onFinish}>
        <Form.Item
          label=" Müşteri Adı"
          name={"customerName"}
          rules={[{ required: true, message: "Müşteri Adı boş geçilemez" }]}
        >
          <Input placeholder="İsim  Soyisim girin.." />
        </Form.Item>
        <Form.Item
          label=" Müşteri Telefon"
          name={"phoneNumber"}
          rules={[
            { required: true, message: "Müşteri Telefonu boş geçilemez" },
          ]}
        >
          <Input placeholder="Telefon numarası girin.." maxLength={11} />
        </Form.Item>
        <Form.Item
          label=" Müşteri Adresi"
          name={"address"}
          rules={[{ required: true, message: "Müşteri Adresi boş geçilemez" }]}
        >
          <Input placeholder="Adres girin.." />
        </Form.Item>

        <Form.Item
          label=" Ödeme Yöntemi"
          name={"paymentMethod"}
          rules={[
            { required: true, message: "Lütfen ödeme yöntemini seçiniz." },
          ]}
        >
          <Select placeholder="Bir Ödeme Yöntemi Seçiniz..">
            <Select.Option value="Nakit">Nakit</Select.Option>
            <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
          </Select>
        </Form.Item>

        <Card>
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
          <div className="flex justify-end">
            <Button
              className="mt-6 bg-[#006341] text-white rounded-xl"
              size="large"
              onClick={() => setIsModalOpen(true)}
              htmlType="submit"
            >
              Sipariş Oluştur
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
};

export default CreateBill;
