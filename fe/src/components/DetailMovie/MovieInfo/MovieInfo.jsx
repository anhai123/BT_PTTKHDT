import React, { useState, useContext } from "react";
import "../MovieInfo/MovieInfo.scss";
// import ModalTrailer from "../../ModalTrailer/ModalTrailer";
import ModalView from "../../ModalTrailer/ModalView";
import filmService from "../../../services/film.service";
import { GlobalState } from "../../../GlobalState";
export default function MovieInfo({ phimItem }) {
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentVideoID, setCurrentVideoID] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  console.log(phimItem)
  const [open, setOpen] = React.useState(false);
  const handleToggle = () => showModal();
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
                alt="https://m.media-amazon.com/images/M/MV5BMjM2NTQ5Mzc2M15BMl5BanBnXkFtZTgwNTcxMDI2NTE@._V1_FMjpg_UX1000_.jpg"
                src={phimItem.poster_ulr}
              />
              <div className="play__btn" onClick={handleToggle}>
                <i className="fa fa-play" />
              </div>
            </div>
          </div>
          <div className="movie__info col-6">
            
              <div className="showtime">
                {moment(phimItem.release_date).format("DD-MM-yy")}
              </div>
              <div className="mb-3 d-flex justify-content-start align-items-center">
                <span className="age--C">{phimItem.genre}</span>
                <span className="name">{phimItem.title}</span>
              </div>

              <p className="during">Thời lượng: {phimItem.duration} phút</p>
              {/* <a href={"#movieTheater"}>
                <button className="bookTicket-btn">Mua Vé</button>
              </a> */}
            
          </div>
          <div className="movie__rating d-flex justify-content-end col-3">
            <div>
            <p style={{color:"white" }}> <h2>Description</h2> <p style={{textAlign:"left"}}>{phimItem.description}</p></p>
            </div>
          </div>
        </div>
      </div>

      {isModalVisible && (
          <ModalView
            videoID={phimItem.trailer}
            handleClose={handleClose}
            isModalVisible={isModalVisible}
            handleCancel={handleCancel}
            url={phimItem.trailer}
          />
        )}
    </section>
  );
}
