import React, { useState } from "react";
import Categories from "../Categories/Categories";
import { Layout, Space, Spin } from "antd";
import SliderCarousel from "../Carousel/Carousel";
import Person from "../Person/Person";
import BottomMainBlock from "../BottomMainBlock/BottomMainBlock";
import { useEffect } from "react";
import geItemForBottomMainBlock from "../../helpers/geItemForBottomMainBlock";

export default function Main() {
  const [loading, setLoading] = useState(true);
  const [dresses, setDresses] = useState(null);
  const { Footer, Sider, Content } = Layout;

  useEffect(() => {
    (async function () {
      const result = await geItemForBottomMainBlock();
      setDresses(result);
    })();
  }, []);

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

  setTimeout(() => {
    setLoading(false);
  }, 500);

  return !loading ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "72%" }}>
        <Layout>
          <Sider
            style={{
              boxShadow: "1px 1px 1px 1px rgba(167, 167, 167, 0.596)",
              borderRadius: "5px",
              backgroundColor: "white",
            }}
          >
            <Categories />
          </Sider>
          <Layout>
            <Content
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "0 10px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#fffafa",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "5px",
                  boxShadow: "1px 1px 1px 1px rgba(167, 167, 167, 0.596)",
                  padding: "5px",
                }}
              >
                <SliderCarousel />
              </div>
            </Content>
            <Footer
              style={{ padding: "0px 0px", margin: "10px 10px 0px 10px" }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "5px",
                  boxShadow: "1px 1px 1px 1px rgba(167, 167, 167, 0.596)",
                }}
              >
                <img
                  style={{ width: "550px", height: "150px" }}
                  src="/img/newblock1.png"
                />
              </div>
            </Footer>
          </Layout>
          <Sider
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#fffafa",
              borderRadius: "5px",
              boxShadow: "1px 1px 1px 1px rgba(167, 167, 167, 0.596)",
            }}
          >
            <Person />
          </Sider>
        </Layout>
        <Layout>
          <Content
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px 0px",
            }}
          >
            <div
              style={{
                width: "100%",
                backgroundColor: "white",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                boxShadow: "1px 1px 1px 1px rgba(167, 167, 167, 0.596)",
              }}
            >
              {dresses?.map((el) => (
                <BottomMainBlock el={el} key={el.id} />
              ))}
            </div>
          </Content>
        </Layout>
      </div>
    </div>
  ) : (
    spinner
  );
}
