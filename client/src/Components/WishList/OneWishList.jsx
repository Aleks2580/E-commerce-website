import React from "react";
import styles from "../Cards/OneCard.module.css";
import { initItem } from "../../store/cart/actionCreators";
import { useSelector, useDispatch } from "react-redux";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useState } from "react";

export default function OneWishList({ el }) {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.user.id);
  const [likeFill, setLikeFill] = useState(el.liked ? true : false);

  const selectCardHandler = async (event) => {};

  const likeHandler = async (event) => {
    setLikeFill(!likeFill);
    const response = await fetch("/delete-item-from-wish-list", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, item_id: el["Item.id"] }),
      credentials: "include",
    });
  };

  const cartHandler = async (event) => {
    const response = await fetch("/delete-item-from-wish-list-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, item_id: el["Item.id"] }),
      credentials: "include",
    });
    const result = await response.json();
    dispatch(initItem(result.cart.length));
  };

  return (
    <Card
      key={el.id}
      onClick={selectCardHandler}
      style={{
        width: "170px",
        height: "270px",
        borderRadius: "5px",
        boxShadow: "1px 1px 1px 1px rgba(167, 167, 167, 0.596)",
      }}
      cover={
        <div style={{ width: "170px", height: "210px" }}>
          <img
            className={styles.image}
            alt="Items_image"
            style={{
              borderRadius: "5px 5px 0px 0px",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src={el["Item.image"]}
          />
        </div>
      }
    >
      <div className={styles.card_bottom}>
        <span className={styles.price}>{"$" + el["Item.price"]}</span>
        <div name="heart" className={styles.heart}>
          <button
            id={el.item_id}
            style={{
              border: "0px",
              background: "none",
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {likeFill ? (
              <HeartOutlined
                onClick={likeHandler}
                style={{ color: "red" }}
                className={styles.icon_card_heart}
              />
            ) : (
              <HeartOutlined
                onClick={likeHandler}
                className={styles.icon_card_heart}
              />
            )}
          </button>
        </div>
        <ShoppingCartOutlined
          onClick={cartHandler}
          style={{ fontSize: "22px", color: "grey", cursor: "pointer" }}
        />
      </div>
    </Card>
  );
}
