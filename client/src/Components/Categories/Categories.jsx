import {
  StarOutlined,
  SkinOutlined,
  PhoneOutlined,
  DesktopOutlined,
  CustomerServiceOutlined,
  SketchOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

import React from "react";
import { useNavigate } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Women's Fashion", "sub1", <StarOutlined />, [
    getItem("Dresses", "1"),
    getItem("Hoodies", "2"),
    getItem("Shirts", "3"),
    getItem("Jeans", "4"),
    getItem("Shoes", "5"),
  ]),
  getItem("Men's Fashion", "sub2", <SkinOutlined />, [
    getItem("Suits", "6"),
    getItem("Jeans & Pants", "7"),
    getItem("Sweaters", "8"),
    getItem("Jackets", "9"),
    getItem("Shoes", "10"),
  ]),
  getItem("Phones & Telecommunications", "sub3", <PhoneOutlined />, [
    getItem("Phones", "11"),
    getItem("Walkie Talkie", "12"),
    getItem("Accessories", "13"),
  ]),
  getItem("Computer, Office & Security", "sub4", <DesktopOutlined />, [
    getItem("Laptops", "14"),
    getItem("Desktops", "15"),
    getItem("Tablets", "16"),
  ]),
  getItem("Consumer Electronics", "sub5", <CustomerServiceOutlined />, [
    getItem("Cameras", "17"),
    getItem("TVs", "18"),
    getItem("Drones", "19"),
  ]),
  getItem("Jewelry & Watches", "sub6", <SketchOutlined />, [
    getItem("Watches", "20"),
    getItem("Rings", "21"),
    getItem("Earings", "22"),
  ]),
  getItem("Home, Pet & Appliances", "sub7", <HomeOutlined />, [
    getItem("Cat Supplies", "23"),
    getItem("Furniture", "24"),
    getItem("Decor", "25"),
  ]),
];

export default function Categories() {
  const navigate = useNavigate();

  const onClick = async (e) => {
    navigate(`/category/${e.keyPath[0]}`);
  };

  return (
    <>
      <Menu
        onClick={onClick}
        style={{
          width: 200,
          borderRadius: "5px",
        }}
        mode="vertical"
        items={items}
      />
    </>
  );
}
