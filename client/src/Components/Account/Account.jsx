import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Form, Input } from "antd";
import { getUser } from "../../store/user/actionCreators";
import style from "./Account.module.css";

export default function Account() {
  const user = useSelector((state) => state.user);
  const [inputPas, setInputPas] = useState({ password: "", passwordRep: "" });
  const [inputEmail, setInputEmail] = useState({ email: "" });
  const [btnPass, setBtnPass] = useState(false);
  const [btnPassTrue, setBtnPassTrue] = useState(false);
  const [btnEmailTrue, setBtnEmailTrue] = useState(false);

  const dispatch = useDispatch();

  const inputHandlerPassword = async (e) => {
    setInputPas({ ...inputPas, [e.target.name]: e.target.value });
  };

  const inputHandlerEmail = async (e) => {
    setInputEmail({ ...inputEmail, [e.target.name]: e.target.value });
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    if (inputPas.password === inputPas.passwordRep) {
      const res = await fetch("/edit-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputPas),
        credentials: "include",
      });
      const toJson = await res.json();
      setBtnPass(false);
      setInputPas({ password: "", passwordRep: "" });
      setBtnPassTrue(true);
      setTimeout(() => {
        setBtnPassTrue(false);
      }, 3000);
    } else {
      setBtnPass(true);
      setBtnPassTrue(false);
    }
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    const res = await fetch("/edit-email", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputEmail),
      credentials: "include",
    });
    const toJsonEmail = await res.json();
    dispatch(getUser(toJsonEmail));
    setBtnEmailTrue(true);
    setTimeout(() => {
      setBtnEmailTrue(false);
    }, 3000);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
        }}
      >
        {" "}
        {user.login ? (
          <>
            <Avatar
              style={{
                backgroundColor: "#b700ff",
              }}
            >
              {user.login[0].toUpperCase()}
            </Avatar>
            <div style={{ margin: "5px", fontSize: "20px" }}>{user.login}</div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div>
        <Form
          name="basic"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "10px",
          }}
          initialValues={{
            remember: true,
          }}
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
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your new password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Password"
                name="password"
                onChange={inputHandlerPassword}
                style={{ width: "300px", borderRadius: "5px" }}
                value={inputPas.password}
              />
            </Form.Item>

            <Form.Item
              name="passwordRep"
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Repeat password"
                name="passwordRep"
                onChange={inputHandlerPassword}
                style={{ width: "300px", borderRadius: "5px" }}
                value={inputPas.passwordRep}
              />
            </Form.Item>
          </div>
          {btnPass ? (
            <div className={style.pasInCor}>Your passwords are defferent</div>
          ) : null}
          {btnPassTrue ? (
            <div style={{ color: "green" }}>Your password has been changed</div>
          ) : null}

          <Button
            className={style.btnChange}
            onClick={handlePassword}
            style={{ width: "300px", height: "40px", marginBottom: "20px" }}
            type="primary"
            shape="round"
            htmlType="submit"
          >
            Change password
          </Button>
        </Form>
      </div>
      <div>
        <Form
          name="basic"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "10px",
          }}
          initialValues={{
            remember: true,
          }}
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
              rules={[
                {
                  required: true,
                  message: "Please input your new email!",
                },
              ]}
            >
              <Input
                placeholder="Email"
                name="email"
                onChange={inputHandlerEmail}
                style={{ width: "300px", borderRadius: "5px" }}
              />
            </Form.Item>
          </div>
          {btnEmailTrue ? (
            <div style={{ color: "green" }}>Your email has been changed</div>
          ) : null}
          <Button
            className={style.btnChange}
            onClick={handleEmail}
            style={{ width: "300px", height: "40px" }}
            type="primary"
            shape="round"
            htmlType="submit"
          >
            Change email
          </Button>
        </Form>
      </div>
    </>
  );
}
