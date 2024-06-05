import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Spin } from "antd";
import todo from "../assets/loginpage.png";
import useLogin from "../hooks/useLogin";
import toast from "react-hot-toast";

const App = () => {
  const { login, loading } = useLogin();

  const onFinish = (values) => {
    const username = values.username;
    const password = values.password;
    console.log(username);
    console.log(password);
    if ((username == "admin" && password == "admin")||(username == "ashwani" && password == "ashwani")) {
      login(username);
    } else {
      toast.error("Incorrect username Or password");
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-1/2 hidden md:flex md:justify-center md:items-center  ">
        <img src={todo} alt="" />
      </div>
      <div className="flex justify-center items-center w-1/2 h-screen">
        <div className="w-full flex flex-col max-w-md gap-10">
          <h1 className="text-3xl font-bold ">Login to TO-DO App</h1>

          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: "100%" }}
                disabled={loading}
              >
                {loading ? <Spin /> : "Log in"}
              </Button>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default App;
