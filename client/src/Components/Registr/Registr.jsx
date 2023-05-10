import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import style from "./Registr.module.css";
import { getUser } from "../../store/user/actionCreators";
import { changeBooleanStateAC } from "../../store/modal/actionCreators";

const RegistrPage = () => {
  const [input, setInput] = useState({ login: '', email: '', password: ''});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputHandler = async(e) => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  const handleRegistr = async(e) => {
    e.preventDefault();
    const res = await fetch('/registr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input),
      credentials: 'include',
    });
    const toJson = await res.json();
    dispatch(getUser(toJson));
    // dispatch(changeBooleanStateAC(true))
    navigate('/');
  }

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
      <Form.Item

        name="login"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input placeholder='Login' name="login" onChange={inputHandler} style={{width: "300px", borderRadius: '5px'}}/>
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input placeholder='Email' name="email" onChange={inputHandler} style={{width: "300px", borderRadius: '5px'}}/>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password placeholder='Password' name="password" onChange={inputHandler} style={{width: "300px", borderRadius: '5px'}}/>
      </Form.Item>
      </div>

        <Button className={style.btnReg} onClick={handleRegistr} style={{width: '300px', height: '40px'}} type="primary" shape="round" htmlType="submit">
          Create account
        </Button>

    </Form>
  );
};
export default RegistrPage;
