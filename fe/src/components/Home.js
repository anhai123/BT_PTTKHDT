import React, { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import UserService from "../services/user.service";
import AddMovieModal from "./Admin/AddMovieModal/AddMovieModal";
import CreateShowTime from "./Admin/CreateShowTime/CreateShowTime";
import EditMovieModal from "./Admin/EditMovieModal/EditMovieModal";
import AccountChecking from "./Admin/AccountChecking/AccountChecking";
import AccountChecked from "./Admin/AccountChecked/AccountChecked";
import MovieManagement from "./Admin/Movie management/MovieManagement";
import ShowtimeManagement from "./Admin/ShowtimeManagement/ShowtimeMangement";
import BookTicket from "./BookTicket/BookTicket";
// import BookTicket from "./BookTicket/BookTicket";
import ListMovie from "./ListMovie/ListMovie";
import Carousel from "./Carousel/Carousel";
import MovieCarousel from "./MovieCarousel/MovieCarousel";
import { Menu, Row, Col, Button, message } from "antd";
import ShowtimeMovie from "./ShowtimeMovie/ShowtimeMovie";
import DetailMovie from "./DetailMovie";
import "./ShowtimeMovie/ShowTime.scss";
import UserInformation from "./UserInformation/UserInformation";
import TatCaMovie from "./AllMovie";
import MoviesSection from "./ModalTrailer/MoviesSection";
// import ChooseSlot from "./BookingSlot/ChooseSlot/ChooseSlot";
import BookingTicket from "./BookingTicket";
import HeaderCom from "./header";
import filmService from "../services/film.service";
import SwiftMovie from "./SwiftMovie/SwiftMovie";
import { GlobalState } from "../GlobalState";
import userService from "../services/user.service";

const Home = () => {
  let navigate = useNavigate();
  const state = useContext(GlobalState);
  const [content, setContent] = useState("");
  const [arrayFilm, setArrayFilm] = useState([]);
  const [selectTypeFilm, setselectTypeFilm] = useState("Sắp chiếu");
  const [filmScreening, setFilmScreening] = useState([]);
  const [film, setfilm] = state.filmsAPI.film;
  const [infoDatVe, setInfoDatVe] = useState();
  const [resetSeat, setResetSeat] = state.filmsAPI.resetSeat;
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);
  useEffect(() => {
    UserService.getFilmByType(selectTypeFilm).then(
      (response) => {
        // setUserInfo(response);
        // setIslog(true);
        // state.userAPI.isLogged.setIsLogged(true);

        setArrayFilm(response);
        message.success("Tìm phim thành công");

        // setCallback(!callback);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(_content);
        message.error(_content);
      }
    );
  }, [selectTypeFilm]);
  useEffect(() => {
    UserService.getFilmScreeningPerFilm().then(
      (response) => {
        // setUserInfo(response);
        // setIslog(true);
        // state.userAPI.isLogged.setIsLogged(true);
        // console.log(response);
        setFilmScreening(response);
        // setCallback(!callback);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(_content);
        message.error(_content);
      }
    );
  }, []);

  const closeModal = async () => {
    setInfoDatVe();
    const resetSeatIds = [];
    for (var i = 0; i < resetSeat.length; i++) {
      resetSeat.map((seat) => {
        resetSeatIds.push(seat.seat_id);
      });
    }
    var uniq = [...new Set(resetSeatIds)];
    console.log(uniq);
    await userService.putCancelSelectSeat(uniq).then(
      (response) => {
        // setUserInfo(response);
        // setIslog(true);
        // state.userAPI.isLogged.setIsLogged(true);

        message.success("reset ghế thành công");
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(_content);
        message.error(_content);
      }
    );
  };
  // console.log(infoDatVe);
  return (
    <>
      {/* <AddMovieModal /> */}
      {/* <CreateShowTime /> */}
      {/* <EditMovieModal /> */}
      {/* <AccountChecking /> */}
      {/* <AccountChecked /> */}
      {/* <MovieManagement /> */}
      {/* <ShowtimeManagement /> */}

      {infoDatVe !== undefined && (
        <>
          <Button
            type="primary"
            style={{ position: "absolute", top: "0", zIndex: "10" }}
            onClick={closeModal}
          >
            Dừng mua vé
          </Button>
          <BookingTicket
            closeModal={closeModal}
            infoDatVe={infoDatVe}
            setInfoDatVe={setInfoDatVe}
          />
        </>
      )}

      <div style={{ padding: "20px 20px", background: "#053455" }}>
        <div>
          <Carousel />
        </div>
        <div>
          <ListMovie selectTypeFilm={setselectTypeFilm} />
          {/* <MovieCarousel filmrender={arrayFilm} /> */}
          <SwiftMovie filmrender={arrayFilm} />
        </div>
        <h1 style={{ paddingTop: "30px", color: "#307fe7" }}>Lịch Chiếu</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <ShowtimeMovie
            filmRender={filmScreening}
            setInfoDatVe={setInfoDatVe}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
{
  /* Trang DetailMovie day nhe */
}
{
  /* <DetailMovie />
      <Row type="flex" justify="center" align="center">
        <Col span={12}>
          <Row type="flex" justify="center" align="center">
            <Button
              style={{
                padding: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              type="text"
              block
            >
              <h1>LỊCH CHIẾU</h1>
            </Button>
          </Row>

          <ShowtimeMovie />
        </Col>
      </Row> */
}
{
  /* <UserInformation /> */
}
{
  /* <TatCaMovie />
      <MoviesSection /> */
}
{
  /* <BookingTicket /> */
}
{
  /* <MoviesSection /> */
}
{
  /* <HeaderCom /> */
}
