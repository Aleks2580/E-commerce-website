import { Button } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdressForm from './AdressForm'
import OneCart from "./OneCart";

export default function Cart() {
  const [cart, setCart] = useState();
  const [sum, setSum] = useState(0)
  const user_id = useSelector((state) => state.user.id);

  useEffect(() => {
    (async function () {
      const response = await fetch("/display-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id }),
        credentials: "include",
      });
      const result = await response.json();
      // console.log(result.cart);
      setCart(result.cart);
    })();
    (function () {  
       cart?.forEach((el) => {
         setSum({...sum, [sum.resSum]: +el['Item.price']}) 
         console.log(sum)
       })
    })()
  }, []);

useEffect(() => {
  let res = 0
  cart?.forEach(el => {
    res += el['Item.price']
  })
  setSum(res)
}, [cart])


  return (
    <div>
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {cart?.map((el) => (
        <OneCart el={el} key={el.id} />
      ))}
    </div>
      {cart?.length ? (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px', }}>
    <Link to='/account/address-form'>
        <Button style={{borderRadius: '5px', width: '200px'}}>{`Buy items ${sum.toFixed(1)}$`}</Button>
    </Link>
    </div>
      ) : (
        <div style={{display: 'flex', justifyContent: 'center', padding: '22px'}}>Your cart is empty</div>
      )}
    </div>
  )
}
