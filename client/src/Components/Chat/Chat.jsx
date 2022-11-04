import { Button } from 'antd';
import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Chat.module.css'

export default function Chat() {

    const user = useSelector((state) => state.user)

    const [ input, setInput ] = useState('')
    const [allMessages, setAllMessages] = useState([])

    function handlerInput(e) {
        setInput( {...input, [e.target.name]: e.target.value})
    }

    const ws = new WebSocket('ws://localhost:4000');
    
    ws.onopen = () => {
      console.log('onopen!!')
    }
    
   const submitClick  = ((e) => {
      e.preventDefault();
      const sendMess = { login: user.login, mess: input.chatInp}
      setAllMessages( [...allMessages, sendMess])
      const jsonMess = JSON.stringify( sendMess )
      ws.send(jsonMess)
      console.log('сообщение отправлено', jsonMess);

    })
    
    ws.onmessage = (e) => {
      const getMess = JSON.parse(e.data)
      setAllMessages( [...allMessages, getMess])
      console.log(allMessages)
      console.log('сообщение получено', getMess);
    }
    // console.log(input)

  return (
    <div>Chat
              <h2 id="users">Чат:</h2>
      <hr />
      <form name="chatForm" className="d-flex formChat">
        <label htmlFor="exampleInput1" className="form-label">Введите сообщение</label>
        <input name="chatInp" onChange={handlerInput} type="text" className="form-control" id="exampleInput1" />
        <Button className={styles.btnReg} onClick={submitClick}  style={{ marginLeft: "3px" }}>Отправить</Button>
      </form>
      <hr />
      <div id="chatDiv" >{allMessages.map((el, index) => (
        <div key={index}>{el.login} : {el.mess}</div>
      ))}</div>
    </div>
  )
}
