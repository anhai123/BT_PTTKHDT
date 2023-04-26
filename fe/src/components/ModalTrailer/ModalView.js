import ReactDOM from "react-dom";
import React, { useState } from "react";
import YoutubeSection from "./YoutubeSection";
import { Modal } from "antd";

const ModalView = ({
  title,
  isModalVisible,
  handleClose,
  handleCancel,
  videoID,
  trailer,
}) => {
  console.log(trailer);
  return (
    <Modal
      title={title}
      width={"725px"}
      visible={isModalVisible}
      onOk={handleClose}
      onCancel={handleCancel}
    >
      <YoutubeSection videoID={videoID} />
    </Modal>
  );
};

export default ModalView;
