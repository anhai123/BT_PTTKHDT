import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate, redirect, useNavigate } from "react-router-dom";
import {
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
  Row,
  Col,
} from "antd";
import { UploadOutlined, PaperClipOutlined } from "@ant-design/icons";
import { GlobalState } from "../../GlobalState";
import { UserOutlined } from "@ant-design/icons";
import "./DescriptionContainer.css";
import React, { useState, useEffect, useContext } from "react";
const { Header, Footer, Sider, Content } = Layout;
const key = "updatable";

const DescriptionContainer = () => {
  let navigate = useNavigate();
  const state = useContext(GlobalState);
  const userInfo = state.userAPI.userInfo[0];
  console.log(userInfo);
  const [form] = Form.useForm();

  const [editingKey, setEditingKey] = useState("");
  const [stateUpload, setState] = useState({
    selectedFile: null,
    selectedFileList: [],
  });
  const [HeroDeleteYet, setHeroDeleteYet] = useState(false);
  const dummyRequest = ({ file, onSuccess }) => {
    // console.log(file);
    // const url = URL.createObjectURL(file);
    // setFile(url);
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const props = {
    name: "file",
    onChange(info) {
      const nextState = {};
      switch (info.file.status) {
        case "uploading":
          nextState.selectedFileList = [info.file];
          break;
        case "done":
          nextState.selectedFile = info.file;
          nextState.selectedFileList = [info.file];
          break;

        default:
          // error or removed
          nextState.selectedFile = null;
          nextState.selectedFileList = [];
      }
      setState(nextState);
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  const cancel = () => {
    setEditingKey("");
  };
  if (HeroDeleteYet) {
    setTimeout(() => {
      message.success({
        content: "Xóa nhân vật thành công",
        key,
        duration: 2,
      });
    }, 1000);
    // navigate("/hero-list", { replace: true });
  }
  const ChoseName = (data) => {
    let name;
    switch (data) {
      case "heroname":
        name = "Tên nhân vật:";
        break;
      case "avatar":
        name = "Ảnh đại diện:";
        break;
      case "description":
        name = "Miêu tả:";
        break;
      case "attackP":
        name = "Điểm tấn công:";
        break;
      case "defendP":
        name = "Điểm phòng thủ:";
        break;
      case "crit_damage":
        name = "Tỉ lệ chí mạng:";
        break;
      default:
      // code block
    }
    return <p>{name}</p>;
  };

  return (
    <>
      <Row className="margin-top">
        <Col
          span={12}
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          Tên đăng nhập
        </Col>
        <Col flex={3} style={{ display: "flex", justifyContent: "flex-start" }}>
          {userInfo.user_name}
        </Col>
      </Row>

      <Row className="margin-top">
        <Col
          span={12}
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          Email:
        </Col>
        <Col flex={3} style={{ display: "flex", justifyContent: "flex-start" }}>
          {userInfo.email}
        </Col>
      </Row>
      {/* <Row className="margin-top">
        <Col
          span={18}
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          Số điện thoại:
        </Col>
        <Col flex={3} style={{ display: "flex", justifyContent: "flex-start" }}>
          3 / 5
        </Col>
      </Row> */}
      <Row className="margin-top">
        <Col
          span={12}
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <UserOutlined style={{ fontSize: "20px" }} />
        </Col>
        <Col flex={3} style={{ display: "flex", justifyContent: "flex-start" }}>
          {userInfo.role}
        </Col>
      </Row>
    </>
  );
};
export default DescriptionContainer;
