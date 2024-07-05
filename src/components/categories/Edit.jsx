import { Modal, Form, Table, Input, Button, message } from "antd";
import React, { useState } from "react";

const Edit = ({
  isEditModalOpen,
  setIsEditModalOpen,
  categories,
  getCategories,
}) => {
  const [editingRow, setEditingRow] = useState({});

  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/update-category", {
        method: "PUT",
        body: JSON.stringify({ ...values, categoryId: editingRow._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Kategori başarıyla güncellendi.");
      getCategories(
        categories.map((item) => {
          if (item._id === editingRow._id) {
            return { ...item, title: values.title };
          }
          return item;
        })
      );
    } catch (error) {
      message.error("Hay aksi! Birşeyler ters gitmiş olmalı.");
      console.log(error);
    }
  };

  const deleteCategory = (id) => {
    if (window.confirm("Kategoriyi silmek istediğinize emin misiniz?")) {
      try {
        fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/delete-category", {
          method: "DELETE",
          body: JSON.stringify({ categoryId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Kategori silindi.")
        getCategories(categories.filter((item)=> item._id !== id));
      } catch (error) {
        message.error("Hay aksi! Birşeyler ters gitmiş olmalı.");
        console.log(error);
        
      }
    }
  };
  const columns = [
    {
      title: "Kategoriler",
      dataIndex: "title",
      render: (_, record) => {
        if (record._id === editingRow._id) {
          return (
            <Form.Item className="mb-0" name="title">
              <Input className="  text-[#006341]" defaultValue={record.title} />
            </Form.Item>
          );
        } else {
          return <p>{record.title}</p>;
        }
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <div>
            <Button
              type="link"
              onClick={() => setEditingRow(record)}
              className="pl-0 text-[#3f5661]"
            >
              Düzenle
            </Button>
            <Button type="link" htmlType="submit" className="text-[#006341]">
              Kaydet
            </Button>
            <Button
              type="link"
              danger
              htmlType="submit"
              onClick={() => deleteCategory(record._id)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <Modal
      open={isEditModalOpen}
      title="Kategori İşlemleri"
      footer={false}
      onCancel={() => {
        setIsEditModalOpen(false);
      }}
    >
      <Form onFinish={onFinish}>
        <Table
          bordered
          dataSource={categories}
          columns={columns}
          rowKey={"_id"}
        />
      </Form>
    </Modal>
  );
};

export default Edit;
