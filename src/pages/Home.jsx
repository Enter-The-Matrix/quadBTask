import { Button, Form, Input, List, Modal, Select } from "antd";
import { useState, useEffect } from "react";
import useLogout from "../hooks/useLogout";
import { useSelector } from "react-redux";
import { DeleteOutlined } from '@ant-design/icons';

function Home() {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [data2render, setData2Render] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { logout } = useLogout();
  const user = useSelector((state) => state.user.username);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("task")) || [];
    const filteredData = storedData.filter((item) => item.user === user);
    setData2Render(filteredData);
  }, [user]);

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    setData2Render([]);
    logout();
  };

  const onFinish = (values) => {
    const newData = {
      user: user,
      title: values.title,
      description: values.titleDescription,
      priority: values.priority,
    };

    const storedData = JSON.parse(localStorage.getItem("task")) || [];
    const updatedData = [...storedData, newData];
    setData2Render((prevData) => [...prevData, newData]);
    localStorage.setItem("task", JSON.stringify(updatedData));

    setTimeout(() => {
      setIsModalOpen(false);
    }, 1000);
    form.resetFields();
  };

  const onFinishFailed = (values) => {
    console.log(values);
  };

  const handleDelete = (index) => {
    setData2Render((prevData) => prevData.filter((_, i) => i !== index));
    localStorage.setItem(
      "task",
      JSON.stringify(data2render.filter((_, i) => i !== index))
    );
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-bold">Welcome {user}!</h1>
      <div className="flex justify-between  px-6">
        <Button type="primary" onClick={() => setIsModalOpen(!isModalOpen)}>
          +Create Task
        </Button>
        <Button onClick={handleLogout}>logout</Button>
      </div>
      <div className="p-6" style={{ maxHeight: "800px", overflowY: "auto" }}>
        <List
          itemLayout="horizontal"
          dataSource={data2render}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <Button
                  key="list-loadmore-edit"
                  onClick={() => handleDelete(index)}
                  icon={<DeleteOutlined className=" text-red-500" />}
                  className="border-red-500 "
                >
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={ <h1 className=" "><span className="font-bold">Task:</span> {item.title}</h1> }
                description={
                  <div className="overflow-auto max-h-40 "> <span className="font-bold text-black">Description:</span> {item.description}</div>
                }
 
              />
              <div className="flex justify-start " > <span className="font-bold">Priority: {item.priority}</span></div>
            </List.Item>
          )}
        />
        
      </div>
      <Modal
        title="Add Task"
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input task title!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Title Description"
            name="titleDescription"
            rules={[
              {
                required: true,
                message: `Please input title description!`,
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="priority"
            label="Select the Priority"
            rules={[
              {
                required: true,
                message: "Please select Priority!",
              },
            ]}
          >
            <Select placeholder="Select the Priority">
              <Option value="low">Low</Option>
              <Option value="normal">Normal</Option>
              <Option value="high">High</Option>
            </Select>
          </Form.Item>

          <div className="flex justify-end">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Add task{" "}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default Home;
