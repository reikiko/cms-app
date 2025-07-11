"use client";

import React, { useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useSettingsStore } from "@/stores/settingsStore";
import {
  Form,
  Select,
  Input,
  Button,
  Typography,
  Divider,
  List,
  Empty,
  message,
} from "antd";

export default function Menus() {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const { menuGroups, menus, addMenu, removeMenu } = useSettingsStore();

  useEffect(() => {
    if (!isAuthenticated) router.push("/");
  }, [isAuthenticated]);

  const [form] = Form.useForm();

  const onFinish = ({ name, groupId }: { name: string; groupId: string }) => {
    addMenu(groupId, name);
    messageApi.success("Menu added!");
    form.resetFields();
  };

  const groupedMenus = menuGroups.map((group) => ({
    ...group,
    menus: menus.filter((m) => m.groupId === group.id),
  }));

  return (
    <>
      {contextHolder}
      <AppLayout>
        <div className="w-full mx-auto p-4 flex flex-col gap-2 h-full overflow-y-scroll">
          <Typography.Title level={3}>Menus</Typography.Title>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="!mb-6 bg-white !p-6 rounded shadow"
          >
            <Form.Item
              name="name"
              label="Menu Name"
              rules={[{ required: true, message: "Please enter menu name" }]}
            >
              <Input placeholder="e.g. Dashboard" />
            </Form.Item>
            <Form.Item
              name="groupId"
              label="Menu Group"
              rules={[
                { required: true, message: "Please select a menu group" },
              ]}
            >
              <Select placeholder="Select a group">
                {menuGroups.map((group) => (
                  <Select.Option key={group.id} value={group.id}>
                    {group.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Add Menu
            </Button>
          </Form>

          {groupedMenus.length === 0 ? (
            <Empty description="No menu groups yet" />
          ) : (
            groupedMenus.map((group) => (
              <div key={group.id} className="mb-6">
                <Typography.Title level={5}>{group.name}</Typography.Title>
                <List
                  bordered
                  dataSource={group.menus}
                  locale={{ emptyText: "No menus in this group" }}
                  renderItem={(menu) => (
                    <List.Item
                      actions={[
                        <Button
                          danger
                          size="small"
                          onClick={() => removeMenu(menu.id)}
                        >
                          Delete
                        </Button>,
                      ]}
                    >
                      {menu.name}
                    </List.Item>
                  )}
                />
                <Divider />
              </div>
            ))
          )}
        </div>
      </AppLayout>
    </>
  );
}
