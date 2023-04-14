import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  Col,
  Row,
  Layout,
  Image,
  Card,
  Form,
  Button,
  List,
  Skeleton,
  Input,
  InputNumber,
  Typography,
  Popconfirm,
  Upload,
  message,
} from "antd";
import "./UserInformation.css";
import DescriptionContainer from "./DescriptionContainer";
import InfoTicketBooked from "./InfoTicketBooked/InfoTicketBooked";
const UserInformation = () => {
  return (
    <>
      <div class="card">
        <div class="card_background_img"></div>
        <div class="card_profile_img"></div>
        <div class="user_details">
          <h3>Gordon Ramsay</h3>
          <p>Master Chef</p>
        </div>
      </div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Thông tin cá nhân" bordered={false}>
            <DescriptionContainer />
          </Card>
        </Col>
        <Col span={16}>
          <Card title="Lịch sử đặt vé" bordered={false}>
            <InfoTicketBooked />
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default UserInformation;
