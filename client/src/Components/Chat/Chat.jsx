import { Button } from "antd";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Chat.module.css";

export default function Chat() {
  const user = useSelector((state) => state.user);

  const [input, setInput] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  function handlerInput(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  /* eslint-disable no-restricted-globals */

  const HOST = location.origin.replace(/^http/, "ws");
  const ws = new WebSocket(HOST);

  ws.onopen = () => {};

  const submitClick = (e) => {
    e.preventDefault();
    const sendMess = { login: user.login, mess: input.chatInp };
    setAllMessages([...allMessages, sendMess]);
    const jsonMess = JSON.stringify(sendMess);
    ws.send(jsonMess);
  };

  ws.onmessage = (e) => {
    const getMess = JSON.parse(e.data);
    setAllMessages([...allMessages, getMess]);
  };

  return (
    <div>
      <form name="chatForm" className="d-flex formChat">
        <label htmlFor="exampleInput1" className="form-label">
          Введите сообщение{" "}
        </label>
        <input
          name="chatInp"
          onChange={handlerInput}
          type="text"
          className="form-control"
          id="exampleInput1"
        />
        <Button
          className={styles.btnReg}
          onClick={submitClick}
          style={{ marginLeft: "3px" }}
        >
          Отправить
        </Button>
      </form>
      <hr />
      <div id="chatDiv">
        {allMessages.map((el, index) => (
          <div key={index}>
            {el.login} : {el.mess}
          </div>
        ))}
      </div>
    </div>
  );
}
