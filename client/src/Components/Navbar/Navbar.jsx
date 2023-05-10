import styles from "../Navbar/Navbar.module.css";
import {
  AudioOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Input, Space } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ModalPage from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/user/actionCreators";
import { changeBooleanStateAC } from "../../store/modal/actionCreators";
import { checkItemFromInputInDB } from "../../helpers/checkItemFromInputInDB";
import { useState } from "react";
import { useEffect } from "react";
import { addItem, initItem } from "../../store/cart/actionCreators";

const { Search } = Input;

// const user = useSelector((state) => state.user);
const Navbar = () => {
  const [items, setItems] = useState(null);
  const modal = useSelector((state) => state.modal);
  const user = useSelector((state) => state.user);
  const user_id = useSelector((state) => state.user.id);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [result, setResult] = useState();

  const searchHandler = async (value) => {
    const { findItems, length } = await checkItemFromInputInDB(value);
    const searchResult = findItems;
    console.log("searchResult", searchResult.length);
    navigate("/search", { state: { searchResult, length, searchWord: value } });
  };

  const handleLogout = async (e) => {
    const res = await fetch("/logout", {
      method: "GET",
      credentials: "include",
    });
    dispatch(logoutUser());
    dispatch(initItem(0));
    navigate("/");
  };

  const modalPageHandler = (arg) => {
    dispatch(changeBooleanStateAC(arg));
  };

  useEffect(() => {
    (async function toBack() {
      const response = await fetch("/add-item-to-cart", {
        method: "DELETE", //SUPPOSED TO BE ANOTHER ROUTES, DID HAVE TIME TO WRITE ANOTHER ONE
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
        credentials: "include",
      });
      const result = await response.json();

      dispatch(initItem(result.cart.length));
      setResult(result.cart.length);
    })();
  }, [cart]);

  return (
    <>
      <div className={styles.banner_container}>
        <Link href="#" className={styles.banner}></Link>
      </div>
      <div style={{backgroundColor: 'white', position: 'sticky', top: '0', zIndex: '3'}}>
      <div style={{marginLeft: '120px', }}>
      <Space className={styles.header} direction="vertical">
        <div className={styles.logo}>
          <Link to="/">
            <span className={styles.logo_base}>E-market</span>
          </Link>
        </div>

        <Search
          name="item"
          className={styles.input}
          placeholder="I'm shopping for..."
          onSearch={searchHandler}
          enterButton
        />
        {!user.login ? (
          <Link
            style={{ display: "flex" }}
            onClick={() => modalPageHandler(true)}
          >
            <ShoppingCartOutlined style={{fontSize: '30px', marginTop: '3px'}} className={styles.icon_cart} />
              <div style={{marginLeft: '4px'}}>
            <div className={styles.cartnum}>
              <span className={styles.span_number}>{cart}</span>
              <Link style={{color: 'black'}} onClick={() => modalPageHandler(true)}>Cart</Link>
              </div>
            </div>
          </Link>
        ) : (
          <Link style={{ display: "flex" }} to="/account/cart">
            <ShoppingCartOutlined style={{fontSize: '30px', marginTop: '3px'}} className={styles.icon_cart} />
            <div style={{marginLeft: '4px'}}>
            <div className={styles.cartnum}>
              <span className={styles.span_number}>{cart}</span>
              <Link style={{color: 'black'}} to="/account/cart">Cart</Link>
              </div>
            </div>
          </Link>
        )}
        {!user.login ? (
          <div style={{marginTop: '10px', marginBottom: '10px'}}>
          <Link
            style={{ display: "flex" }}
            onClick={() => modalPageHandler(true)}
          >
            <HeartOutlined style={{fontSize: '30px', marginTop: '7px'}} className={styles.icon_heart} />
            <div style={{marginLeft: '4px', width: '32px' }}>
            <Link style={{color: 'black'}} onClick={() => modalPageHandler(true)}>
              Wish  List
            </Link>
            </div>
          </Link>
          </div>
        ) : (
          <div style={{marginTop: '10px', marginBottom: '10px'}}>
          <Link style={{ display: "flex" }} to="/account/wish-list">
            <HeartOutlined style={{fontSize: '30px', marginTop: '7px'}} className={styles.icon_heart} />
            <div style={{marginLeft: '4px', width: '32px', display: 'flex',  }}>
            <Link style={{color: 'black'}} to="/account/wish-list">
              Wish<br />List
            </Link>
            </div>
          </Link>
          </div>
        )}
        <UserOutlined className={styles.icon_cart} />
        <div className={styles.sign_join_my}>
          <div className={styles.sign_login}>
            {!user.login ? (
              <ModalPage />
            ) : (
              <Link style={{color: 'black'}} onClick={handleLogout}>Logout</Link>
            )}
          </div>
          <div>
            <span>My E-market</span>
          </div>
        </div>
      </Space>
      </div>
      </div>
    </>
  );
};
export default Navbar;
