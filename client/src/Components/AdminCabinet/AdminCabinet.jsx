import style from "./Admin.module.css";
import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import getItemsFieldsForAdmin from "../../helpers/getItemsFieldsForAdmin";

import addNewItemToDB from "../../helpers/addNewItemToDB";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export default function AdminCabinet() {
  // const user = useSelector((state) => state.user);
  const [allFieldsArray, setAllFieldsArray] = useState([]);
  const [input1, setInput1] = useState();
  const [input2, setInput2] = useState();
  const [allInputs, setAllInputs] = useState();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    (async function () {
      const result = await getItemsFieldsForAdmin();
      const array = Object.keys(result);
      setAllFieldsArray(array);
    })();
  }, []);

  const handler = (event) => {
    setInput1(event.target.value);
  };

  const handler2 = (event) => {
    setInput2(event.target.value);
    setAllInputs({ ...allInputs, [input1]: input2 });
  };

  const handler3 = (event) => {
    setAllInputs({ ...allInputs, [event.target.name]: event.target.value });
  };

  const key = 'updatable';

  const saveHandler = () => {
    addNewItemToDB(allInputs);
    
    message.loading({
      content: 'Processing...',
      key,
    });
    setTimeout(() => {
      message.success({
        content: 'Your item has been added, thank you!',
        key,
        duration: 2,
      });
      setOk(true);
    }, 2500);

    setTimeout(() => {
      setOk(false);
          }, 5000)
  };
  
  return (
    <>
    {ok ? (
      <div style={{width: '530px', display: 'flex', justifyContent: 'center'}}>
        
        {/* <div style={{display: 'flex', justifyContent: 'center'}}>
        <img style={{width: '30px', height: '30px'}} src='/img/ok.png' alt='ok'/>
        </div> */}
        <div style={{color: 'green', fontSize: '23px', marginLeft: '0px'}}>Your items has been added!</div>
      </div>
    ) : (
<div style={{ display: "flex", flexDirection: "column", width: "300px", marginLeft: '110px' }}>
<div style={{ display: "flex", justifyContent: 'center' }}>
  <div style={{ display: "flex", justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
  <div>
    {/* <div>
      <label for="cars">Choose a property: </label>
    </div> */}
    <select style={{width: '300px', margin: '10px 0px', height: '26px', fontSize: '18px', textAlign: 'center'}} onChange={handler} name="tag1" id="cars">
      <option>Choose option</option>
      <option value="color">Color</option>
      <option value="size">Size</option>
      <option value="brand">Brand</option>
      <option value="processor">Processor</option>
      <option value="display">Display</option>
      <option value="gender">Gender</option>
      <option value="style">Style</option>
    </select>
    <div>
      <input className={style.inpAll}  style={{borderRadius: '6px', width: '300px'}} onChange={handler2} name="first" type="text" />
    </div>
  </div>
  {/* <div>
    <label for="cars">Choose a property: </label>
  </div> */}
  <div>
    <select style={{width: '300px', margin: '10px 0px', height: '26px', fontSize: '18px', textAlign: 'center'}} onChange={handler} name="cars" id="cars">
      <option>Choose option</option>
      <option value="color">Color</option>
      <option value="size">Size</option>
      <option value="brand">Brand</option>
      <option value="processor">Processor</option>
      <option value="display">Display</option>
      <option value="gender">Gender</option>
      <option value="style">Style</option>
    </select>
    <div>
      <input className={style.inpAll} style={{borderRadius: '6px', width: '300px', border: '1px solid grey'}} onChange={handler2} type="text" />
    </div>
  </div>
  <div>
    <div>Price: </div>
    <input
    className={style.inpAll} 
      onChange={handler3}
      placeholder="Price in $"
      name="price"
      type="text"
      style={{borderRadius: '6px', width: '300px'}}
    />
  </div>
  <div>
    <div>Image:</div>
    <input className={style.inpAll} style={{borderRadius: '6px', width: '300px'}} onChange={handler3} placeholder="Your path" name="image" />
  </div>
  <div>
    <div>Title: </div>
    <input
    className={style.inpAll} 
      onChange={handler3}
      placeholder="Title your item"
      name="title"
      style={{borderRadius: '6px', width: '300px'}}
    />
  </div>
  <select style={{width: '300px', margin: '10px 0px', height: '26px', fontSize: '18px', textAlign: 'center'}} onChange={handler3} name="category_id" id="cars">
    <option>Choose category</option>
    <option value="1">Dresses</option>
    <option value="2">Women's hoodies</option>
    <option value="3">Women's shirts</option>
    <option value="4">Women's jeans</option>
    <option value="5">Women's shoes</option>
    <option value="6">Men's suits</option>
    <option value="7">Men's jeans & pants</option>
    <option value="8">Men's sweaters</option>
    <option value="9">Men's jackets</option>
    <option value="10">Men's shoes</option>
    <option value="11">Phones</option>
    <option value="12">Walkie Talkie</option>
    <option value="13">Accessories</option>
    <option value="14">Laptops</option>
    <option value="15">Desktops</option>
    <option value="16">Tablets</option>
    <option value="17">Cameras</option>
    <option value="18">TVs</option>
    <option value="19">Drones</option>
    <option value="20">Watches</option>
    <option value="21">Rings</option>
    <option value="22">Earings</option>
    <option value="23">Cat Supplies</option>
    <option value="24">Furniture</option>
    <option value="25">Decor</option>
  </select>
  <Button
    className={style.btnReg}
    onClick={saveHandler}
    style={{ width: '300px', height: "40px" }}
    type="primary"
    shape="round"
    htmlType="submit"
  >
    Save
  </Button>
</div>
</div>
</div>
    )}
      
    </>
  );
}
