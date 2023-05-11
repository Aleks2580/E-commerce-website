import { useLocation } from "react-router-dom";
import styles from "./AllCards.module.css";
import React from "react";
import { useEffect, useState } from "react";
import { Layout } from "antd";
import { Space, Spin } from "antd";
import { Pagination } from "antd";
import { Form, Radio } from "antd";
import SearchRenderOneCard from "./SearchRenderOneCard";
import filterMap from "../../helpers/filterMapFunction";
import FormFilter from "./FormFilter";
import { loadFilterItemPagination } from "../../helpers/loadFilterItemPagination";
const { Footer, Sider, Content } = Layout;

export default function SearchRenderAllCards() {
  const [loading, setLoading] = useState(true);
  const [loadingSort, setLoadingSort] = useState(true);
  const [checkTag, setCheckTag] = useState({});
  const location = useLocation();
  const [items, setItems] = useState(location.state.searchResult);
  const [filterTags, setFilterTags] = useState(location.state.searchResult);
  const [arrSize, setArrSize] = useState();
  const [arrColor, setArrColor] = useState();
  const [arrBrand, setArrBrand] = useState();
  const [arrProcessor, setArrProcessor] = useState();
  const [arrDisplay, setArrDisplay] = useState();
  const [arrGender, setArrGender] = useState();
  const [arrStyle, setArrStyle] = useState();
  const [current, setCurrent] = useState(1);
  const [length, setLength] = useState(location.state.length);

  const onChange = async (page, event) => {
    setCurrent(page);
    setTimeout(async () => {
      setLoadingSort(true);
      setCurrent(page);

      const result = await loadFilterItemPagination({
        value: location.state.searchWord,
        check: {
          check: checkTag,
        },
        page: page,
      });

      setItems(result.items);
      setLength(result.length);
    }, 100);
  };

  const handler = async (event) => {
    setCheckTag({ ...checkTag, [event.target.name]: event.target.value });
    setCurrent(1);
    const result = await loadFilterItemPagination({
      value: location.state.searchWord,
      check: {
        check: { ...checkTag, [event.target.name]: event.target.value },
      },
      page: current,
    });
    setItems(result.items);
    setLength(result.length);

    setLoadingSort(false);
    setTimeout(() => {
      setLoadingSort(true);
    }, 500);
  };

  const sortLowHandler = (e) => {
    const spred = [...items];
    const sort = spred.sort((min, max) => min.price - max.price);
    setItems(sort);
  };

  const sortHighHandler = (e) => {
    const spred = [...items];
    const sort = spred.sort((min, max) => max.price - min.price);
    setItems(sort);
  };

  setTimeout(() => {
    setLoading(false);
  }, 500);

  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("");
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

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

  useEffect(() => {
    if (filterTags) {
      const res = filterMap(filterTags);
      setArrSize(res.size);
      setArrColor(res.color);
      setArrBrand(res.brand);
      setArrProcessor(res.processor);
      setArrDisplay(res.display);
      setArrGender(res.gender);
      setArrStyle(res.style);
    }
  }, [filterTags, current, length]);

  return !loading ? (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
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
                        name="low"
                      >
                        Low
                      </Radio.Button>
                      <Radio.Button
                        style={{ borderColor: "black", color: "black" }}
                        onClick={sortHighHandler}
                        name="high"
                      >
                        High
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Form>
                {arrSize.length ? (
                  <FormFilter
                    array={arrSize}
                    name="size"
                    onChange={onChange}
                    handler={handler}
                  />
                ) : (
                  ""
                )}
                {arrColor.length ? (
                  <FormFilter
                    array={arrColor}
                    name="color"
                    onChange={onChange}
                    handler={handler}
                  />
                ) : (
                  ""
                )}
                {arrBrand.length ? (
                  <FormFilter
                    array={arrBrand}
                    name="brand"
                    onChange={onChange}
                    handler={handler}
                  />
                ) : (
                  ""
                )}
                {arrProcessor.length ? (
                  <FormFilter
                    array={arrProcessor}
                    name="processor"
                    onChange={onChange}
                    handler={handler}
                  />
                ) : (
                  ""
                )}
                {arrDisplay.length ? (
                  <FormFilter
                    array={arrDisplay}
                    name="display"
                    onChange={onChange}
                    handler={handler}
                  />
                ) : (
                  ""
                )}
                {arrGender.length ? (
                  <FormFilter
                    array={arrGender}
                    name="gender"
                    onChange={onChange}
                    handler={handler}
                  />
                ) : (
                  ""
                )}
                {arrStyle.length ? (
                  <FormFilter
                    array={arrStyle}
                    name="style"
                    onChange={onChange}
                    handler={handler}
                  />
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
                    {items?.map((el) => (
                      <SearchRenderOneCard el={el} key={el.id} />
                    ))}
                  </div>
                )}
              </Content>
              <Footer style={{ textAlign: "center", marginTop: "50px" }}>
                <div>
                  {length > 10 ? (
                    <Pagination
                      current={current}
                      onChange={onChange}
                      total={length}
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
    </>
  ) : (
    spinner
  );
}
