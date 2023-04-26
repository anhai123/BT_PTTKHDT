import React, { useState } from "react";
import { Card, Button, Modal, Typography } from "antd";
import YoutubeSection from "./YoutubeSection";
import "./MovieItem.scss";
import DetailMovie from "../DetailMovie";
import { Navigate, useNavigate } from "react-router-dom";

const { Paragraph, Text } = Typography;
const { Meta } = Card;

function GameEntry(props) {
  const navigatee = useNavigate();

  const [navigate, setNavigate] = useState(false);
  const clickMovie = () => {
    console.log("dang an chon phim day");
    console.log(props.movie_main);
    setNavigate(true);
  };
  if (navigate) {
    // return <Navigate to="/detail-select-movie" />;
    navigatee("/detail-select-movie", { state: props.movie_main });
  }
  return (
    <div>
      <Card
        bodyStyle={{ paddingBottom: "0px" }}
        className="gameCard"
        hoverable
        cover={
          <div
            style={{
              overflow: "hidden",
              height: "200px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div onClick={clickMovie} className="content-left">
              <div className="left-header-movie">
                <h1 className="movie-name">{props.title}</h1>
                <h4 className="group-id">{props.type}</h4>
                <div style={{ display: "flex" }}>
                  <p className="during-time">{props.duration}</p>
                  <p className="date-time">{props.release_date}</p>
                </div>
              </div>

              <div className="description">{props.description}</div>
            </div>
            <div class="play">
              <img src="http://cdn1.iconfinder.com/data/icons/flavour/button_play_blue.png" />
            </div>

            <div class="itemsContainer" style={{ minWidth: "20%" }}>
              <div class="image">
                <a href="#">
                  <img
                    style={{
                      objectFit: "cover",
                      height: "100%",
                      width: "100%",
                      borderRadius: "11px",
                    }}
                    src={props.imgURL}
                  />
                </a>
              </div>
              <div
                class="play"
                onClick={() => {
                  props.setCurrentVideoID(props.videoID);
                  props.showModal();
                }}
              >
                <img src="http://cdn1.iconfinder.com/data/icons/flavour/button_play_blue.png" />{" "}
              </div>
            </div>
          </div>
        }
      ></Card>
    </div>
  );
}

export default GameEntry;
