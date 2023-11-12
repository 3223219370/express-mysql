import { Form, Input, Message } from "@alifd/next";
import React from "react";
import axios from "axios";

export default function Login({ setCurrentRoot }) {
  const submit = async (value) => {
    const {data} = await axios({ url: "api/login", method: "POST", data: value });
    if (!data?.success) {
      return Message.error('用户名或密码错误')
    }
    setCurrentRoot("crud");
  };
  return (
    <Form style={{ width: 300, margin: "100px auto" }}>
      <Form.Item label="用户名">
        <Input name="username" />
      </Form.Item>
      <Form.Item label="密码">
        <Input.Password name="password" />
      </Form.Item>
      <Form.Item>
        <Form.Submit type="primary" htmlType="submit" onClick={submit}>
          登录
        </Form.Submit>
      </Form.Item>
    </Form>
  );
}
