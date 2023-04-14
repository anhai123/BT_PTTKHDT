import React from "react";
import "../MovieInfo/MovieInfo.scss";
// import ModalTrailer from "../../ModalTrailer/ModalTrailer";

export default function MovieInfo({ phimItem }) {
  const [open, setOpen] = React.useState(false);
  const handleToggle = () => setOpen(!open);
  var moment = require("moment");
  const renderStar = (rating) => {
    if (rating > 5) rating = 5;
    var content = [];
    for (let i = 0; i < rating; i++) {
      let star = [];
      star.push(<i className="fa fa-star" key={i}></i>);
      content.push(star);
    }
    for (let i = 0; i < 5 - rating; i++) {
      let star = [];
      star.push(<i className="fa fa-star-half-alt" key={i}></i>);
      content.push(star);
    }
    return content;
  };
  const countRatingMark = (rating) => {
    return rating * 0.5 + 10 * 0.5;
  };

  return (
    <section className="movieInfo">
      <div className="full__background">
        <img
          src={phimItem.hinhAnh}
          alt={phimItem.hinhAnh}
          style={{ height: "450px" }}
        />
        <div className="overlay__gradient" />
        <div className="play__mobile">
          <i className="fa fa-play" />
        </div>
        <div className="rating__point">
          <p className="film__point">{countRatingMark(4)}</p>
          <div className="rating__stars">{renderStar(7)}</div>
        </div>
      </div>
      <div className="form__info container">
        <div className="row">
          <div className="movie__poster text-left col-3">
            <div
              style={{ width: 220, height: 300 }}
              className="poster__img d-flex justify-content-center align-items-center"
            >
              <img
                className="w-100 h-100"
                src="https://m.media-amazon.com/images/M/MV5BMjM2NTQ5Mzc2M15BMl5BanBnXkFtZTgwNTcxMDI2NTE@._V1_FMjpg_UX1000_.jpg"
                alt={phimItem.hinhAnh}
              />
              <div className="play__btn" onClick={handleToggle}>
                <i className="fa fa-play" />
              </div>
            </div>
          </div>
          <div className="movie__info col-6">
            <div>
              <div className="showtime">
                {moment(phimItem.ngayKhoiChieu).format("DD-MM-yy")}
              </div>
              <div className="mb-3 d-flex justify-content-start align-items-center">
                <span className="age--C">maNhom</span>
                <span className="name">tenPhim</span>
              </div>

              <p className="during">120 phút</p>
              <a href={"#movieTheater"}>
                <button className="bookTicket-btn">Mua Vé</button>
              </a>
            </div>
          </div>
          <div className="movie__rating d-flex justify-content-end col-3">
            <div>
              <div className="rating__point">
              {countRatingMark(4)}
                <div className="vongtronxanh"></div>
              </div>
              <div className="rating__stars">
                {renderStar(8)}
              </div>
              <div className="rating__text">
               8 người đánh giá
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="film__infoMobile">
        <div className="days">
          {moment(phimItem.ngayKhoiChieu).format("DD-MM-yy")}
        </div>
        <div className="name">yyh</div>
        <div className="during">120 phút</div>
      </div>
      {/* <ModalTrailer
        trailer={phimItem.trailer}
        maPhim={phimItem.maPhim}
        open={open}
        handleToggle={handleToggle}
      /> */}
    </section>
  );
}
