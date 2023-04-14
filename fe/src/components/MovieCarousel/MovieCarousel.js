import React from "react";
import { Row, Col, Carousel } from "antd";

import "./MovieCarousel.css";
import MovieCarouselItem from "../MovieCarouselItem/MovieCarouselItem";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

// from https://react-slick.neostack.com/docs/example/custom-arrows
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        color: "black",
        fontSize: "15px",
        lineHeight: "1.5715",
      }}
      onClick={onClick}
    >
      {" "}
      <RightOutlined />
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        color: "black",
        fontSize: "15px",
        lineHeight: "1.5715",
      }}
      onClick={onClick}
    >
      <LeftOutlined />
    </div>
  );
};

const settings = {
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

const MovieCarousel = () => {
  return (
    <>
      <Row justify="center">
        <Col span={16}>
          <Carousel arrows {...settings}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <MovieCarouselItem />
              <MovieCarouselItem />
              <MovieCarouselItem />
              <MovieCarouselItem />
            </div>

            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
        </Col>
      </Row>
    </>
  );
};

export default MovieCarousel;
