import React, { useState } from "react";
import { Button, message } from "antd";
import { Row, Col } from "antd";
import MovieEntry from "./MovieEntry";
import Movies from "./Movies";
import ModalView from "./ModalView";

function MoviesSection(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentVideoID, setCurrentVideoID] = useState("");
  console.log(props.filmRender);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div id="video-game" className="block bgGray" style={{ width: "50%" }}>
      <div className="container-fluid">
        {props.filmRender.map((Movies, i) => {
          return (
            <Col span={24}>
              <MovieEntry
                movie_id={Movies.movie_id}
                key={Movies.movie_id}
                title={Movies.title}
                imgURL={Movies.poster_ulr}
                description={Movies.description}
                videoID={Movies.trailer}
                type={Movies.type}
                duration={Movies.duration}
                release_date={Movies.release_date}
                setCurrentVideoID={setCurrentVideoID}
                showModal={showModal}
                movie_main={Movies}
                trailer={Movies.trailer}
              />

              {isModalVisible && (
                <ModalView
                  videoID={Movies.trailer}
                  handleClose={handleClose}
                  isModalVisible={isModalVisible}
                  handleCancel={handleCancel}
                />
              )}
            </Col>
          );
        })}
      </div>
    </div>
  );
}

export default MoviesSection;
