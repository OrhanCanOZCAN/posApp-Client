import { Modal, Button } from "antd";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PrintBill = ({ isModalOpen, setIsModalOpen, customer }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <Modal
      title="E-Fatura"
      className="text-[#006341]"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
      width={800}

      //   onOk={handleOk} onCancel={handleCancel}
    >
      <section className="" ref={componentRef}>
        <div className="max-w-5xl mx-auto bg-white px-14">
          <article className="overflow-hidden">
            <div className="logo my-2">
              {/* <h2 className="text-4xl font-semibold md:text-6xl text-[#3f5661]">
              LOGO
            </h2> */}
              <img src="/images/starbucks.png" alt="" width={50} />
            </div>
            <div className="bills-details">
              <div className="grid sm:grid-cols-4 grid-cols-3 gap-7">
                <div>
                  <p className="font-bold text-lg">Satıcı:</p>
                  <p className="text-[#3f5661] text-sm font-semibold">
                    Shaya Kahve Sanayi ve Ticaret A.Ş.
                  </p>
                  <p className="text-[#3f5661] text-sm">
                    Saray Mh. Site Yolu Sk. No:5 Anel Plaza Zemin Kat 34768
                    Ümraniye / İstanbul
                  </p>
                </div>
                <div>
                  <p className="font-bold text-lg">Müşteri Adı: </p>
                  <p className="text-[#3f5661] text-sm">
                    {customer?.customerName}{" "}
                  </p>
                  <p className="font-bold text-lg">Adres:</p>
                  <p className="text-[#3f5661] text-sm">{customer?.address}</p>
                  {/* <p className="text-black text-sm">Dumlupınar Bulvarı</p>
                  <p className="text-black text-sm">(Eskişehir Yolu) No:6 </p>
                  <p className="font-bold text-black text-sm">
                    Yenimahalle / ANKARA
                  </p> */}
                </div>
                <div>
                  <p className="font-bold text-lg">Fatura Numarası:</p>
                  <p className="text-[#3f5661] text-sm">
                    000{Math.floor(Math.random() * 100)}
                  </p>
                  <p className="font-bold text-lg mt-4">Veriliş Tarihi:</p>
                  <p className="text-black text-sm">
                    {customer?.createdAt.substring(0, 10)}
                  </p>
                </div>
                <div className="sm:block hidden">
                  <p className="font-bold text-lg">Satış Bilgileri:</p>
                  <p className="text-[#3f5661] text-sm">Mersis No:</p>
                  <p className="text-[#3f5661] text-sm ">0769031011600554</p>
                 
                  {/* <p className="text-black text-sm font-semibold mt-2">
                    Gönderim Tarihi:
                  </p>
                  <p className=" text-black text-sm">{customer?.createdAt.substring(0,10)}</p> */}
                </div>
              </div>
            </div>
            <div className="bill-table-area mt-7">
              <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-left text-sm font-bold text-[#006341] sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      Ürün Görseli
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-left text-sm font-bold text-[#006341] sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      Ürün İsmi
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-left text-sm font-bold text-[#006341] sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      Fiyat
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-center text-sm font-bold text-[#006341] sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      Adet
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-right text-sm font-bold text-red-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      TOPLAM
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customer?.cartItems
                    .map((item) => (
                      <tr className="border-b border-slate-600" key={item._id}>
                        <td className="py-1 pr-3">
                          <img
                            src={item.img}
                            alt=""
                            className="w-14 h-14 object-contain rounded shadow "
                          />
                        </td>
                        <td className="py-4 pr-3 ">
                          <span className="text-[#006341] font-medium">
                            {item.title}
                          </span>
                        </td>
                        <td className="py-4 pr-3 text-left">
                          <span className="text-[#3f5661] ">
                            {item.price.toFixed(2)} ₺{" "}
                          </span>
                        </td>
                        <td className="py-4 pr-3 text-center">
                          <span className="text-[#3f5661]">
                            {item.quantity}{" "}
                          </span>
                        </td>
                        <td className="py-4  text-end">
                          <span className="text-[#3f5661]">
                            {(item.price * item.quantity).toFixed(2)} ₺
                          </span>
                        </td>
                      </tr>
                    ))
                    .reverse()}
                </tbody>
                <tfoot>
                  <tr className="AraTop">
                    <th
                      className="text-right text-black pt-10"
                      colSpan="4"
                      scope="row"
                    >
                      <span> Ara Toplam:</span>
                    </th>

                    <th className="text-right text-black pt-10" scope="row">
                      <span> {customer?.subTotal.toFixed(2)} ₺</span>
                    </th>
                  </tr>
                  <tr className="KDV">
                    <th
                      className="text-right text-black"
                      colSpan="4"
                      scope="row"
                    >
                      <span className="text-red-700"> KDV %8:</span>
                    </th>
                    <th className="text-right text-black" scope="row">
                      <span className="text-red-700">
                        {" "}
                        {customer?.tax.toFixed(2)} ₺
                      </span>
                    </th>
                  </tr>
                  <tr className="TOPLAM">
                    <th
                      className="text-right text-black"
                      colSpan="4"
                      scope="row"
                    >
                      <span className=""> TOPLAM:</span>
                    </th>
                    <th className="text-right text-black" scope="row">
                      <span className="">
                        {" "}
                        {customer?.totalAmount.toFixed(2)} ₺
                      </span>
                    </th>
                  </tr>
                </tfoot>
              </table>
              <div className="py-10">
                <div className="border-t pt-2">
                  <p className="flex flex-col text-black">
                    <b className="mt-10">AÇIKLAMALAR</b>
                    <span className="text-[11px]">
                      İrsaliye yerine geçmektedir. E-Arşiv izni kapsamında
                      elektronik ortamda iletilmiştir.
                    </span>
                    <span className="text-[11px]">
                      Ödeme koşulları 14 gündür. Revize faturanın 14 gün
                      içerisinde ödenmemesi durumunda vadesi geçmiş hesaba ek
                      faiz %8 yasal oran artı %0,5 banka faizi olmak üzere %8,5
                      faiz uygulanacaktır. Taraflar Kanun hükümleri dışında
                      sözleşme yapamazlar.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <div className="flex justify-end mt-2">
        <Button
          type=""
          className="bg-[#006341] text-white font-semibold"
          size="large"
          onClick={handlePrint}
        >
          Yazdır
        </Button>
      </div>
    </Modal>
  );
};

export default PrintBill;
