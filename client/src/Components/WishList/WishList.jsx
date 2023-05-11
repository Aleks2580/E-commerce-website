import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import OneWishList from "./OneWishList";

export default function WishList() {
  const user_id = useSelector((state) => state.user.id);

  const [wishList, setWishList] = useState();
  useEffect(() => {
    (async function () {
      const response = await fetch("/display-wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id }),
        credentials: "include",
      });
      const result = await response.json();

      setWishList(result.wishList);
    })();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          marginLeft: "70px",
          marginBottom: "20px",
        }}
      >
        {wishList?.map((el) => (
          <OneWishList el={el} key={el.id} />
        ))}
      </div>
      {wishList?.length ? (
        <></>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          Your wish list is empty
        </div>
      )}
    </>
  );
}
