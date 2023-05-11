import React from "react";
import OrderMessage from "./OrderMessage";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import OneOrder from "./OneOrder";

export default function Orders() {
  const user_id = useSelector((state) => state.user.id);
  const [order, setOrder] = useState();

  useEffect(() => {
    (async function () {
      const response = await fetch("/display-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id }),
        credentials: "include",
      });
      const result = await response.json();
      setOrder(result.orders);
    })();
  }, []);
  return (
    <>
      {order?.length ? (
        <>
          <div>
            <OrderMessage />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {order?.map((el) => (
              <OneOrder el={el} key={el.id} />
            ))}
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          No orders
        </div>
      )}
    </>
  );
}
