import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";

export default function BottomMainBlock({ el }) {
  const navigate = useNavigate();

  function clickId() {
    navigate("/item-card", { state: { el } });
  }

  return (
    <Card
      key={1}
      style={{
        width: "150px",
        height: "210px",
        borderRadius: "5px",
        boxShadow: "1px 1px 1px 1px rgba(167, 167, 167, 0.596)",
        margin: "10px 6px 10px 6px",
      }}
      cover={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <div style={{ width: "130px", height: "150px" }}>
            <img
              onClick={clickId}
              alt="Items_image"
              style={{
                cursor: "pointer",
                borderRadius: "5px 5px 5px 5px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={el.image}
            />
          </div>
        </div>
      }
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <span style={{ fontWeight: "bold", fontSize: "20px" }}>
          {el.price} $
        </span>
        <div name="heart"></div>
      </div>
    </Card>
  );
}
