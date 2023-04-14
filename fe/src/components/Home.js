import React, { useState, useEffect } from "react";

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
import { Menu, Row, Col, Button } from "antd";
import ShowtimeMovie from "./ShowtimeMovie/ShowtimeMovie";
import DetailMovie from "./DetailMovie";
import "./ShowtimeMovie/ShowTime.scss";
import UserInformation from "./UserInformation/UserInformation";
import TatCaMovie from "./AllMovie";
import MoviesSection from "./ModalTrailer/MoviesSection";
// import ChooseSlot from "./BookingSlot/ChooseSlot/ChooseSlot";
import BookingTicket from "./BookingTicket";
const Home = () => {
  const [content, setContent] = useState("");

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

  return (
    <>
      {/* <AddMovieModal /> */}
      {/* <CreateShowTime /> */}
      {/* <EditMovieModal /> */}
      {/* <AccountChecking /> */}
      {/* <AccountChecked /> */}
      {/* <MovieManagement /> */}
      {/* <ShowtimeManagement /> */}
      {/* <Carousel /> */}
      {/* <ListMovie />
      <MovieCarousel /> */}

      {/* Trang DetailMovie day nhe */}
      {/* <DetailMovie />
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
      </Row> */}
      {/* <UserInformation /> */}
      {/* <TatCaMovie />
      <MoviesSection /> */}
      <BookingTicket />
    </>
  );
};

export default Home;
