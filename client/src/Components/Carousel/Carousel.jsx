import { Carousel } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function SliderCarousel() {
  return (
    <Carousel style={{ width: "550px", borderRadius: "5px" }} autoplay>
      <div>
        <Link to="/category/20">
          <img
            style={{ width: "550px", height: "160px", borderRadius: "5px" }}
            src="/img/sale2.png"
          />
        </Link>
      </div>
      <div>
        <Link to="/category/1">
          <img
            style={{ width: "550px", height: "160px", borderRadius: "5px" }}
            src="/img/mainblock.png"
          />
        </Link>
      </div>
    </Carousel>
  );
}
