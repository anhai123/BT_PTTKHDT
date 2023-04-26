import { useEffect, useState, useContext } from "react";
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
import { GlobalState } from "../../GlobalState";
import userService from "../../services/user.service";
const UserInformation = () => {
  const state = useContext(GlobalState);
  const [userInfo, setUserInfo] = state.userAPI.userInfo;
  const [history, setHistory] = state.userAPI.history;
  const [callback, setCallback] = state.userAPI.callback;
  const [usIn, setUsIn] = useState();
  console.log(userInfo);
  console.log(history);
  if (userInfo === null) {
    setCallback(!callback);
  }
  useEffect(() => {
    userService.getAllUserInfor().then(
      (response) => {
        // setUserInfo(response);
        // setIslog(true);
        // state.userAPI.isLogged.setIsLogged(true);

        message.success("Lấy thông tin cá nhân người dùng thành công");
        setUsIn(response);
        // console.log(response);
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
  return (
    <>
      {userInfo && usIn && (
        <>
          <div class="card">
            <div class="card_background_img"></div>
            <div class="card_profile_img"></div>
            <div class="user_details">
              <h3>{userInfo.user_name.toUpperCase()}</h3>
              <p>{userInfo.role}</p>
            </div>
          </div>
          <Row gutter={16}>
            <Col span={10}>
              <Card title="Thông tin cá nhân" bordered={false}>
                <DescriptionContainer usIn={usIn} />
              </Card>
            </Col>
            <Col span={14}>
              <Card title="Lịch sử đặt vé" bordered={false}>
                <InfoTicketBooked />
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
export default UserInformation;
