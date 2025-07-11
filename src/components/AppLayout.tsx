"use client";

import React, { useEffect } from "react";
import {
  LaptopOutlined,
  SettingOutlined,
  DownOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useRouter, usePathname } from "next/navigation";
import { useHasHydrated } from "@/hooks/useHasHydrated";
import { Layout, Menu, theme, Space, Dropdown } from "antd";
import Link from "next/link";
import type { MenuProps } from "antd";
import { useAuthStore } from "@/stores/authStore";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const { Header, Content, Footer, Sider } = Layout;

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const hasHydrated = useHasHydrated();

  /* ANTD THEME */
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  /* AUTH CONTEXT */
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const username = useAuthStore((s) => s.username);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();
  const path = usePathname();

  /* DEFINE SELECTED AND OPENED KEY */
  const getSelectedKey = () => {
    if (path.startsWith("/settings/menuGroups")) return "menuGroups";
    if (path.startsWith("/logic")) return "logic";
    if (path.startsWith("/settings/menus")) return "menus";
    if (path.startsWith("/settings")) return "settings";
    if (path === "/home" || path === "/") return "home";
    return "";
  };

  const getOpenKey = () => {
    if (path.startsWith("/settings")) return "settings";
    return "";
  };

  /* NPPROGRESS BAR */
  useEffect(() => {
    NProgress.start();
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 300); // Delay so it feels natural

    return () => clearTimeout(timeout);
  }, [path]);

  /* DROPDOWN MENU ITEMS */
  const items: MenuProps["items"] = [
    {
      key: "logout",
      label: "Logout",
      danger: true,
      onClick: () => {
        logout();
        router.push("/");
      },
    },
  ];

  const menuItems: MenuProps["items"] = [
    {
      key: "home",
      label: <Link href={"/"}>Home</Link>,
      icon: <HomeOutlined />,
    },
    ...(isAuthenticated
      ? [
          {
            key: "settings",
            label: "Settings",
            icon: <SettingOutlined />,
            children: [
              {
                label: <Link href={"/settings/menuGroups"}>Menu Groups</Link>,
                key: "menuGroups",
              },
              {
                label: <Link href={"/settings/menus"}>Menus</Link>,
                key: "menus",
              },
            ],
          },
        ]
      : []),
    {
      type: "divider",
    },
    {
      key: "logic",
      label: <Link href={"/logic"}>Logic Test</Link>,
      icon: <LaptopOutlined />,
    },
  ];

  if (!hasHydrated) return null;

  return (
    <Layout
      style={{ minHeight: "100vh" }}
      className="flex flex-col justify-between"
    >
      {/* Header */}
      <Header
        style={{ display: "flex", alignItems: "center" }}
        className="flex justify-between"
      >
        <h1 className="text-white text-2xl shadow-lg font-bold">CMS</h1>
        {!isAuthenticated ? (
          <Button
            color="primary"
            variant="solid"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        ) : (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <div
              className="cursor-pointer text-white hover:text-gray-200"
              onClick={(e) => e.preventDefault()}
            >
              <Space>
                {username}
                <DownOutlined />
              </Space>
            </div>
          </Dropdown>
        )}
      </Header>

      {/* Main layout */}
      <div className="px-[12px] md:px-[48px]">
        <Layout
          style={{
            padding: "4px 4px",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* Desktop Sidebar */}
          <Sider
            style={{ background: colorBgContainer }}
            width={200}
            className="hidden md:block"
          >
            <Menu
              mode="inline"
              selectedKeys={[getSelectedKey()]}
              defaultOpenKeys={[getOpenKey()]}
              style={{ height: "100%" }}
              items={menuItems}
            />
          </Sider>

          <Layout>
            {/* Mobile Menu (Horizontal) */}
            <div className="block md:hidden">
              <Menu
                mode="horizontal"
                selectedKeys={[getSelectedKey()]}
                style={{ borderBottom: "1px solid #f0f0f0" }}
                items={menuItems}
              />
            </div>

            <Content
              style={{
                padding: "0 24px",
                minHeight: 280,
                height: "70vh",
                background: colorBgContainer,
                paddingTop: "12px",
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </div>

      <Footer style={{ textAlign: "center" }} className="!text-gray-600">
        CMS Application ©2025 Created by Kiko Reiki
      </Footer>
    </Layout>
  );
};

export default AppLayout;
