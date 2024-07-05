import { Form, Input, Button, Carousel, message } from "antd";
import { Link } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/auth/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      if (res.status === 200) {
        message.success("Kayıt işlemi başarılı.");
        navigate("/login")
        setLoading(false)
      }
    } catch (error) {
      message.danger("Bir şeyler yanlış gitti.");
      console.log(error);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-center h-full  ">
        <div className="flex flex-col h-full w-full justify-center items-center ml-1 px-46 relative">
          <img
            src="/images/starbucks.png"
            alt=""
            width={225}
            className="mb-24"
          />
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              className=" text-sm font-medium mb-4"
              label="Kullanıcı Adı:"
              name={"username"}
              rules={[
                { required: true, message: "Kullanıcı Adı boş bırakılamaz!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="text-sm font-medium mb-4"
              label="Email:"
              name={"email"}
              rules={[{ required: true, message: "Email boş bırakılamaz!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="text-sm font-medium mb-4"
              label="Şifre:"
              name={"password"}
              rules={[{ required: true, message: "Şifre boş bırakılamaz!" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              className=" text-sm font-medium mb-4"
              label="Şifre (Tekrar):"
              name={"passwordAgain"}
              dependencies={["password"]}
              rules={[
                { required: true, message: "Şifrenizi tekrar girin!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Girdiğiniz şifreler uyuşmuyor")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item className="flex justify-center items-center mt-20">
              <Button
                htmlType="submit"
                className="bg-[#006341] text-white rounded-3xl font-bold w-40 h-10"
                loading={loading}
              >
                Kaydol
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full mt-4">
            Bir hesabınız var mı ? &nbsp;
            <Link to="/login" className="text-[#006341] font-semibold">
              {" "}
              Şimdi giriş yap
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#006341] ">
          <div className="w-full ">
            <Carousel autoplay className="text-black h-screen">
              <AuthCarousel
                img="/images/reserve.png"
                title="Güzel bir kahve deneyimi için bekleriz."
                desc="Starbucks"
              />
              <AuthCarousel
                img="/images/thank-you.png"
                title="Bizi tercih ettiğiniz için teşekkür ederiz."
                desc="Starbucks"
              />
              <AuthCarousel
                img="/images/rewards.png"
                title="Güzel bir kahveyle ödüllendirin kendinizi."
                desc="Starbucks"
              />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
