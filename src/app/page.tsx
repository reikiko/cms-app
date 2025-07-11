"use client";

import AppLayout from "@/components/AppLayout";
import { useAuthStore } from "@/stores/authStore";
import { Carousel, Col, Row, Statistic } from "antd";
import type { StatisticProps } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import CountUp from "react-countup";

export default function Home() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const username = useAuthStore((s) => s.username);

  const contentStyle: React.CSSProperties = {
    height: "280px",
    color: "#fff",
    lineHeight: "280px",
    textAlign: "center",
    background: "oklch(27.9% 0.041 260.031)",
  };

  const formatter: StatisticProps["formatter"] = (value) => (
    <CountUp end={value as number} separator="," />
  );

  return (
    <AppLayout>
      <div className="flex flex-col w-full h-full gap-6">
        {isAuthenticated ? (
          <p className="text-2xl">
            Hello <span className="font-bold">{username}</span>! Welcome to{" "}
            <span className="font-bold">CMS Application</span>!
          </p>
        ) : (
          <div>
            <p className="text-2xl">
              Welcome to <span className="font-bold">CMS Application</span>!
            </p>
            <p className=" text-gray-500">
              Sidebar Setting Menus will appear after you Login.
            </p>
          </div>
        )}
        <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
          <div className="">
            <h3 style={contentStyle}>1</h3>
          </div>
          <div className="">
            <h3 style={contentStyle}>2</h3>
          </div>
          <div className="">
            <h3 style={contentStyle}>3</h3>
          </div>
          <div className="">
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic
              title="Active Users"
              value={2427}
              formatter={formatter}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Account Balance (IDR)"
              value={1024189}
              precision={2}
              formatter={formatter}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic
              title="Feedback"
              value={1024}
              prefix={<LikeOutlined />}
            />
          </Col>
          <Col span={12}>
            <Statistic title="Unmerged" value={89} suffix="/ 100" />
          </Col>
        </Row>
      </div>
    </AppLayout>
  );
}
