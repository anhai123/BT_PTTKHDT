import React, { useState } from "react";
import { Card, Button, Modal, Typography } from "antd";
import YoutubeSection from "./YoutubeSection";
import "./MovieItem.scss";
const { Paragraph, Text } = Typography;
const { Meta } = Card;

function GameEntry(props) {
  return (
    <div>
      <Card
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
            <div className="content-left">
              <div className="left-header-movie">
                <h1 className="movie-name">ten phim</h1>
                <h4 className="group-id">ma nhom</h4>
                <div style={{ display: "flex" }}>
                  <p className="during-time">120 phút</p>
                  <p className="date-time">ngay khoi chieu</p>
                </div>
              </div>

              <div className="description">
                These examples are programmatically compiled from various online
                sources to illustrate current usage of the word 'description.'
                Any opinions expressed in the examples do not represent those of
                Merriam-Webster or its editors. Send us feedback about these
                examples.
              </div>
            </div>
            <div class="play">
              <img src="http://cdn1.iconfinder.com/data/icons/flavour/button_play_blue.png" />
            </div>

            <div class="itemsContainer">
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
