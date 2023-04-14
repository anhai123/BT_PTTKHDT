import React, { useState } from "react";
import { Button, message } from "antd";
import { Row, Col } from "antd";
import MovieEntry from "./MovieEntry";
import Movies from "./Movies";
import ModalView from "./ModalView";

function MoviesSection() {
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

  return (
    <div id="video-game" className="block bgGray">
      <div className="container-fluid">
        <Row gutter={36}>
          {Movies.map((Movies, i) => (
            <Col span={12}>
              <MovieEntry
                id={i}
                key={i}
                title={Movies.title}
                imgURL={Movies.imgURL}
                description={Movies.console}
                videoID={Movies.videoID}
                setCurrentVideoID={setCurrentVideoID}
                showModal={showModal}
              />
            </Col>
          ))}
          {isModalVisible && (
            <ModalView
              videoID={currentVideoID}
              handleClose={handleClose}
              isModalVisible={isModalVisible}
              handleCancel={handleCancel}
            />
          )}
        </Row>
      </div>
    </div>
  );
}

export default MoviesSection;
