import React from "react";
import {
  UserOutlined,
  ProfileOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import style from "./Person.module.css";
import { Link } from "react-router-dom";
import { changeBooleanStateAC } from "../../store/modal/actionCreators";

export default function Person() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const modalPageHandler = (arg) => {
    dispatch(changeBooleanStateAC(arg));
  };

  return user.login ? (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "25px" }}
      >
        <Avatar
          style={{ backgroundColor: "#a622ffb9" }}
          icon={<UserOutlined />}
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        <p style={{ fontWeight: "bold", fontSize: "17px" }}>Hi, {user.login}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <UserOutlined style={{ fontSize: "20px", marginLeft: "6px" }} />
        <ProfileOutlined style={{ fontSize: "20px", marginRight: "2px" }} />
        <MessageOutlined style={{ fontSize: "20px", marginRight: "15px" }} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "7px",
        }}
      >
        <Link to="/account/info" style={{ fontSize: "13px", color: "black" }}>
          Account
        </Link>
        <Link to="/account/orders" style={{ fontSize: "13px", color: "black" }}>
          Orders
        </Link>
        <Link to="/account/chat" style={{ fontSize: "13px", color: "black" }}>
          Messages
        </Link>
      </div>
      <div
        style={{
          width: "190px",
          height: "180px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className={style.bottomBlock}>
          <div className={style.bottomFirst}>
            <p className={style.exc}>Exclusive offers</p>
            <p className={style.newMem}>Just for new E-market members!</p>
            <p className={style.newPrice}>for $1:</p>
          </div>
          <div className={style.bottomSecond}></div>
          <div className={style.bottomThird}>
            <div>
              <Link to="/category/20">
                <img
                  style={{
                    width: "175px",
                    height: "75px",
                    borderRadius: "7px",
                  }}
                  src="/img/person.png"
                  alt="meow"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "90px" }}
      >
        <Avatar
          style={{ backgroundColor: "#a622ffb9" }}
          icon={<UserOutlined />}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p style={{ fontWeight: "bold", fontSize: "17px" }}>
          Welcome to E-market
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button
          onClick={() => modalPageHandler(true)}
          className={style.btnClick}
          shape="round"
          htmlType="submit"
        >
          Registr | Login
        </Button>
      </div>
    </div>
  );
}
