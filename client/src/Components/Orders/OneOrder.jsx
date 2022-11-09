import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

export default function OneOrder({ el }) {

  const navigate = useNavigate();

  function clickId() {
    console.log(el.id);
    navigate('/item-card', {state: {el}})
  }

  return (
    <>
      <Card
        style={{
          width: 250,
        }}
      >
        <>
          <Meta
            avatar={<Avatar onClick={clickId} src={el["Item.image"]} />}
            title={el["Item.title"]}
            description={"$" + el["Item.price"]}
          />
        </>
      </Card>
    </>
  );
}
