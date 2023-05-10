import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "../Registr/Registr.module.css";
import { getUser } from "../../store/user/actionCreators";
import { changeBooleanStateAC } from "../../store/modal/actionCreators";
import { initItem, addItem } from "../../store/cart/actionCreators";
import { Radio } from "antd";

const AdressForm = () => {
  const [input, setInput] = useState({ country: "", city: "", address: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user_id = useSelector((state) => state.user.id);

  const inputHandler = async (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const orderHandler = async () => {

    const key = 'updatable';
    const response = await fetch("/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id }),
      credentials: "include",
    });
    const result = await response.json();
    dispatch(initItem(result.cart.length));
    
    message.loading({
      content: 'Processing...',
      key,
    });
    setTimeout(() => {
      message.success({
        content: 'Your order is accepted, thank you!!',
        key,
        duration: 2,
      });
      navigate('../orders')
    }, 2000);
  };

  return (
    <Form
      name="basic"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      initialValues={{
        remember: true,
      }}
      //   onFinish={onFinish}
      //   onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Form.Item
          name="country"
          rules={[
            {
              required: true,
              message: "Please input your county!",
            },
          ]}
        >
          <Input
            placeholder="Country"
            name="country"
            onChange={inputHandler}
            style={{ width: "300px", borderRadius: "5px" }}
          />
        </Form.Item>

        <Form.Item
          name="city"
          rules={[
            {
              required: true,
              message: "Please input your city!",
            },
          ]}
        >
          <Input
            placeholder="City"
            name="city"
            onChange={inputHandler}
            style={{ width: "300px", borderRadius: "5px" }}
          />
        </Form.Item>

        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your address!",
            },
          ]}
        >
          <Input
            placeholder="Address"
            name="address"
            onChange={inputHandler}
            style={{ width: "300px", borderRadius: "5px" }}
          />
        </Form.Item>

        <Radio.Group name="radiogroup" defaultValue={1}>
          <Radio value={1}>pay upon receipt</Radio>
          <Radio value={2}>pay now</Radio>
        </Radio.Group>
      </div>

      <Button
        onClick={orderHandler}
        className={style.btnReg}
        style={{ width: "300px", height: "40px", margin: "17px" }}
        shape="round"
        htmlType="submit"
      >
        Make an order
      </Button>
    </Form>
  );
};
export default AdressForm;
