import styles from "./AllCards.module.css";
import React from "react";
import OneCard from "./OneCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Layout } from "antd";
import { Space, Spin } from "antd";
import { Pagination } from "antd";
import { Form, Radio } from "antd";
import filterMap from "../../helpers/filterMapFunction";
import FormFilter from "./FormFilter";
import { loadItempagination } from "../../helpers/loadItemPagination";
const { Footer, Sider, Content } = Layout;

export default function AllCards() {
  const [allItems, setAllItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingSort, setLoadingSort] = useState(true);
  const [checkTag, setCheckTag] = useState({});
  const [filterItems, setFilterItems] = useState();
  const [arrSize, setArrSize] = useState();
  const [arrColor, setArrColor] = useState();
  const [allFindItems, setallFindItems] = useState();
  const [arrBrand, setArrBrand] = useState();
  const [arrProcessor, setArrProcessor] = useState();
  const [arrDisplay, setArrDisplay] = useState();
  const [arrGender, setArrGender] = useState();
  const [arrStyle, setArrStyle] = useState();
  const { id } = useParams();

  const [current, setCurrent] = useState(1);

  const onChange = async (page) => {
    setCurrent(page);
    const result = await loadItempagination({ page: current, category: id });
    setAllItems(result.likedItems);
    setFilterItems(result.likedItems);
    setallFindItems(result.length);
  };

  useEffect(() => {
    if (id) {
      (async function () {
        const result = await loadItempagination({
          page: current,
          category: id,
        });
        setAllItems(result.likedItems);
        setFilterItems(result.likedItems);
        setallFindItems(result.length);
      })();
    }
  }, [current]);

  const handler = async (event) => {
    setCheckTag({ ...checkTag, [event.target.name]: event.target.value });
    const response = await fetch("/filter-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        check: { ...checkTag, [event.target.name]: event.target.value },
        categId: id,
      }),
    });
    const responseToJSON = await response.json();
    setLoadingSort(false);
    setTimeout(() => {
      setLoadingSort(true);
    }, 500);
    setAllItems(responseToJSON);
  };

  const sortLowHandler = (e) => {
    const spred = [...allItems];
    const sort = spred.sort((min, max) => min.price - max.price);
    setAllItems(sort);
  };

  const sortHighHandler = (e) => {
    const spred = [...allItems];
    const sort = spred.sort((min, max) => max.price - min.price);
    setAllItems(sort);
  };

  useEffect(() => {
    if (filterItems) {
      const res = filterMap(filterItems);
      setArrSize(res.size);
      setArrColor(res.color);
      setArrBrand(res.brand);
      setArrProcessor(res.processor);
      setArrDisplay(res.display);
      setArrGender(res.gender);
      setArrStyle(res.style);
    }
  }, [filterItems]);

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

  const spinnerSort = (
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

  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("");
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  return !loading ? (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
    >
      <div style={{ width: "72%" }}>
        <Layout>
          <Sider
            style={{
              boxShadow: "1px 1px 1px 1px rgba(167, 167, 167, 0.596)",
              borderRadius: "5px",
              backgroundColor: "white",
              height: "697px",
              position: "sticky",
              top: "55px",
            }}
          >
            <div className={styles.sider_div}>
              <Form
                form={form}
                layout="vertical"
                initialValues={{
                  requiredMarkValue: requiredMark,
                }}
                onValuesChange={onRequiredTypeChange}
                requiredMark={requiredMark}
              >
                <Form.Item>
                  <div className={styles.div_span}>
                    <span className={styles.span}>Sort by price</span>
                  </div>
                  <Radio.Group>
                    <Radio.Button
                      style={{ borderColor: "black", color: "black" }}
                      onClick={sortLowHandler}
                    >
                      Low
                    </Radio.Button>
                    <Radio.Button
                      style={{ borderColor: "black", color: "black" }}
                      onClick={sortHighHandler}
                    >
                      High
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Form>

              {arrSize?.length ? (
                <FormFilter array={arrSize} name="size" handler={handler} />
              ) : (
                ""
              )}
              {arrColor?.length ? (
                <FormFilter array={arrColor} name="color" handler={handler} />
              ) : (
                ""
              )}
              {arrBrand?.length ? (
                <FormFilter array={arrBrand} name="brand" handler={handler} />
              ) : (
                ""
              )}
              {arrProcessor?.length ? (
                <FormFilter
                  array={arrProcessor}
                  name="processor"
                  handler={handler}
                />
              ) : (
                ""
              )}
              {arrDisplay?.length ? (
                <FormFilter
                  array={arrDisplay}
                  name="display"
                  handler={handler}
                />
              ) : (
                ""
              )}
              {arrGender?.length ? (
                <FormFilter array={arrGender} name="gender" handler={handler} />
              ) : (
                ""
              )}
              {arrStyle?.length ? (
                <FormFilter array={arrStyle} name="style" handler={handler} />
              ) : (
                ""
              )}
            </div>
          </Sider>
          <Layout>
            <Content
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "0 10px",
              }}
            >
              {!loadingSort ? (
                spinnerSort
              ) : (
                <div className={styles.mainDiv}>
                  {allItems?.map((el) => (
                    <OneCard el={el} key={el.id} />
                  ))}
                </div>
              )}
            </Content>
            <Footer style={{ textAlign: "center", marginTop: "50px" }}>
              <div>
                {allFindItems > 10 ? (
                  <Pagination
                    current={current}
                    onChange={onChange}
                    total={allFindItems}
                  />
                ) : (
                  ""
                )}
              </div>
            </Footer>
          </Layout>
        </Layout>
      </div>
    </div>
  ) : (
    spinner
  );
}
