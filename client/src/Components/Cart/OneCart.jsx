import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { initItem, addItem } from "../../store/cart/actionCreators";
const { Meta } = Card;

export default function OneCart({ el }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.user.id);
  const [display, setDisplay] = useState(true);

  const deleteHandler = async (event) => {
    console.log("click!!!!");
    const response = await fetch("/display-cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, item_id: el.item_id }),
      credentials: "include",
    });
    const result = await response.json();
    if (result) {
      setDisplay(false);
    }
    dispatch(initItem(result.cart.length));
  };

  const redirectHandler = () => {
    console.log('el in cart', el);
    navigate('/item-card', {state: {el}})
  } 

  return (
    <>
      {display ? (
        <Card
          style={{
            width: 240,

          }}
        >
          <>
            <Meta
              avatar={<Avatar onClick={redirectHandler} style={{cursor: 'pointer' }} src={el["Item.image"]} />}
              title={el["Item.title"]}
              description={"$" + el["Item.price"]}
            />
            <DeleteOutlined onClick={deleteHandler} />
          </>
        </Card>
      ) : null}
    </>
  );
}
