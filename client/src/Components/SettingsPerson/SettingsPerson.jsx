import React, { useState } from "react";
import { Layout, Space, Spin, Carousel } from "antd";
import { Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const contentStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  lineHeight: "160px",
  textAlign: "center",
  background: "gray",
};

export default function SettingsPerson() {
  const [loading, setLoading] = useState(true);
  const [itemsSlide, setItemsSlide] = useState({});
  const [findItem, setFindItem] = useState(false);
  const user = useSelector((state) => state.user);
  const { Sider, Content } = Layout;

  const spinner = (
    <div style={{ display: "flex", justifyContent: "center", height: "300px" }}>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Space size="middle">
          <Spin size="large" />
        </Space>
      </div>
    </div>
  );

  useEffect(() => {
    (async function () {
      const userFindBack = await fetch("/find-slider", {
        method: "GET",
        credentials: "include",
      });
      const itemsAll = await userFindBack.json();
      if (itemsAll.length) {
        setFindItem(true);
        setItemsSlide(itemsAll);
      }
    })();
  }, []);

  setTimeout(() => {
    setLoading(false);
  }, 500);

  function getItem(label, key, children) {
    return {
      label,
      key,
      children,
    };
  }

  const items = [
    getItem(<Link to="/account/info">Account</Link>, 1),
    getItem(<Link to="/account/wish-list">Wish List</Link>, 2),
    getItem(<Link to="/account/orders">Orders</Link>, 3),
    getItem(<Link to="/account/cart">Cart</Link>, 4),
    getItem(<Link to="/account/chat">Chat</Link>, 5),
    user.status === "admin" || user.status === "seller"
      ? getItem(<Link to="/account/upload-items">Upload items</Link>, 6)
      : "",
    user.status === "admin"
      ? getItem(<Link to="/account/admin-panel">Admin panel</Link>, 7)
      : "",
  ];

  return !loading ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "72%" }}>
        <Layout>
          <Sider
            style={{ background: "white", height: "100px" }}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {}}
            onCollapse={(collapsed, type) => {
            
            }}
          >
            <div className="logo" />
            <Menu
              style={{
                borderRadius: "5px",
                boxShadow: "1px 1px 1px 1px rgba(167, 167, 167, 0.596)",
              }}
              theme="white"
              mode="inline"
              defaultSelectedKeys={["4"]}
              items={items}
            />
          </Sider>
          <Layout>
            <Content
              style={{
                margin: "0px 16px",
                borderRadius: "10px",
              }}
            >
              <div
                className="site-layout-background"
                style={{
                  padding: 24,
                  minHeight: 360,
                  borderRadius: "5px",
                  boxShadow: "1px 1px 1px 1px rgba(167, 167, 167, 0.596)",
                }}
              >
                <Outlet />
              </div>
            </Content>
            <Sider
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "white",
                height: "200px",
                backgroundColor: "white",
                borderRadius: "5px",
                boxShadow: "1px 1px 1px 1px rgba(167, 167, 167, 0.596)",
              }}
            >
              <div style={{ display: "flex", width: "180px", height: "200px" }}>
                <div
                  style={{
                    backgroundColor: "red",
                    width: "180px",
                    height: "180px",
                    marginTop: "11px",
                  }}
                >
                  {itemsSlide.length ? (
                    <Link to="/category/13">
                      <Carousel autoplay>
                        <div style={{ width: "180px", height: "180px" }}>
                          <img src={itemsSlide[0].image} style={contentStyle} />
                        </div>
                        <div style={{ width: "180px", height: "180px" }}>
                          <img src={itemsSlide[1].image} style={contentStyle} />
                        </div>
                        <div style={{ width: "180px", height: "180px" }}>
                          <img src={itemsSlide[2].image} style={contentStyle} />
                        </div>
                        <div style={{ width: "180px", height: "180px" }}>
                          <img src={itemsSlide[3].image} style={contentStyle} />
                        </div>
                      </Carousel>
                    </Link>
                  ) : (
                    <Carousel autoplay>
                      <div>
                        <img style={contentStyle} />
                      </div>
                      <div>
                        <img style={contentStyle} />
                      </div>
                      <div>
                        <img style={contentStyle} />
                      </div>
                      <div>
                        <img style={contentStyle} />
                      </div>
                    </Carousel>
                  )}
                </div>
              </div>
            </Sider>
          </Layout>
        </Layout>
      </div>
    </div>
  ) : (
    spinner
  );
}
