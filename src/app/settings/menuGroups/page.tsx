"use client";

import React, { useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { useAuthStore } from "@/stores/authStore";
import { useSettingsStore } from "@/stores/settingsStore";
import { useRouter } from "next/navigation";
import { Button, Form, Input, List, Typography, message, Empty } from "antd";

export default function MenuGroups() {
  const [messageApi, contextHolder] = message.useMessage();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const router = useRouter();

  const { menuGroups, addMenuGroup, removeMenuGroup } = useSettingsStore();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!isAuthenticated) router.push("/");
  }, [isAuthenticated]);

  const onFinish = ({ name }: { name: string }) => {
    addMenuGroup(name);
    messageApi.success("Menu Group added!");
    form.resetFields();
  };

  return (
    <>
      {contextHolder}
      <AppLayout>
        <div className="w-full mx-auto p-4 flex flex-col gap-2">
          <Typography.Title level={3}>Menu Groups</Typography.Title>

          <Form
            form={form}
            layout="inline"
            onFinish={onFinish}
            className="mb-6 flex flex-wrap gap-2 justify-between md:justify-start"
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please enter a group name" }]}
            >
              <Input placeholder="New Menu Group" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>

          <List
            bordered
            className="my-4 py-4"
            dataSource={menuGroups}
            locale={{ emptyText: <Empty description="No menu groups yet" /> }}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    danger
                    size="small"
                    onClick={() => removeMenuGroup(item.id)}
                  >
                    Delete
                  </Button>,
                ]}
              >
                {item.name}
              </List.Item>
            )}
          />
        </div>
      </AppLayout>
    </>
  );
}
