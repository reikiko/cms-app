"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { Button, Input, Form as AntForm, message } from "antd";

export default function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const onFinish = (values: { username: string; password: string }) => {
    setLoading(true);
    if (values.password === "admin") {
      messageApi.success("Login Success");
      setTimeout(() => {
        login(values.username);
        router.push("/");
        setLoading(false);
      }, 1500);
    } else {
      messageApi.error("Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-sm p-4 bg-white rounded shadow">
          <AntForm onFinish={onFinish} layout="vertical">
            <AntForm.Item
              name="username"
              label="Username"
              rules={[{ required: true }]}
            >
              <Input placeholder="You may enter any username" />
            </AntForm.Item>
            <AntForm.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input.Password placeholder="Password" />
            </AntForm.Item>
            <Button htmlType="submit" type="primary" block>
              {loading ? "Loading..." : "Login"}
            </Button>
          </AntForm>
        </div>
      </div>
    </>
  );
}
