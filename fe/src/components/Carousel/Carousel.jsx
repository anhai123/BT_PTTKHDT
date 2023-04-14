import { Carousel } from "antd";
import "./Carousel.scss";
import BookTicket from "../BookTicket/BookTicket";
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const CarouselComponent = () => (
  <div>
    <Carousel autoplay>
    <div className="item">
      <div className="item__img">
        <img
          className="img-fluid"
          src="https://s3img.vcdn.vn/123phim/2020/07/yeu-nhau-mua-e-15949150603140.png"
          alt="phim soi"
        />
        <div className="background__overlay">
          <i className="fa fa-play carousel__button" />
        </div>
      </div>
    </div>
    <div className="item">
      <div className="item__img">
        <img
          className="img-fluid"
          src="https://s3img.vcdn.vn/123phim/2020/05/vi-anh-deo-tin-15906776637571.png"
          alt="hinh anh phim"
        />
        <div className="background__overlay">
          <i className="fa fa-play carousel__button" />
        </div>
      </div>
    </div>
    <div className="item">
      <div className="item__img">
        <img
          className="img-fluid"
          src="https://s3img.vcdn.vn/123phim/2020/07/ban-dao-15954792351353.jpg"
          alt="va phim cua hinh anh"
        />
        <div className="background__overlay">
          <i className="fa fa-play carousel__button" />
        </div>
      </div>
    </div>
  
  </Carousel>
     <BookTicket />
  </div>
  
);
export default CarouselComponent;
