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
import React, { useCallback, useEffect, useState } from "react";
import { UploadOutlined, PaperClipOutlined } from "@ant-design/icons";

import { UserOutlined } from "@ant-design/icons";
import "./DescriptionContainer.css";

const { Header, Footer, Sider, Content } = Layout;
const key = "updatable";
const DescriptionContainer = () => {
  let { state } = useLocation();
  let navigate = useNavigate();

  const [form] = Form.useForm();
  const dispatcher = useDispatch();

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

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handelClickEditButton = (values) => {
    // console.log(values);
    form.setFieldsValue({
      heroname: "",
      description: "",
      attackP: "",
      defendP: "",
      crit_damage: "",
      avatar: "",
      //   [values]: data[values],
    });
    setEditingKey(values);
  };
  const handelClickDeleteHeroButton = (key, data) => {
    // console.log(data);
    // dispatcher(deleteHeroAPI(data._id));
  };
  const save = async (key) => {
    // try {
    //   const row = await form.validateFields();
    //   // console.log(row);
    //   let newData;
    //   if (key === "avatar") {
    //     let hero = await resizeFile(row.avatar.file.originFileObj).then(
    //       (uri) => {
    //         let hero1 = { ...data, avatar: uri };
    //         return hero1;
    //       }
    //     );
    //     newData = hero;
    //   } else {
    //     newData = { ...data };
    //     newData[key] = row[key];
    //     // console.log(newData);
    //   }
    //   // console.log(newData);
    //   dispatcher(updateHeroList(newData));
    //   dispatcher(updateHero(newData));
    //   setTimeout(() => {
    //     message.success({
    //       content: "Cập nhật thông tin nhân vật thành công",
    //       key,
    //       duration: 2,
    //     });
    //   }, 1000);
    //   setEditingKey("");
    // } catch (errInfo) {
    //   console.log("Validate Failed:", errInfo);
    // }
  };

  const cancel = () => {
    setEditingKey("");
  };

  //   useEffect(() => {
  //     setData(heroList.find((hero) => hero.key === state.key));
  //   }, [form.getFieldsValue()]);

  //Đảm bảo quay lại trang hero list mà dữ liệu trong list đã được cập nhật
  //   useEffect(() => {
  //     if (data === undefined) {
  //       setTimeout(() => {
  //         message.success({
  //           content: "Xóa nhân vật thành công",
  //           key,
  //           duration: 2,
  //         });
  //       }, 1000);
  //       setHeroDeleteYet(true);
  //     }
  //     return () => redirect("/hero-list");
  //   }, [data]);

  //   const origindata = data !== undefined ? Object.entries(data) : [];
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
      <Row>
        <Col
          span={18}
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          Tài khoản:
        </Col>
        <Col flex={3} style={{ display: "flex", justifyContent: "flex-start" }}>
          3 / 5
        </Col>
      </Row>
      <Row className="margin-top">
        <Col
          span={18}
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          Họ tên:
        </Col>
        <Col flex={3} style={{ display: "flex", justifyContent: "flex-start" }}>
          3 / 5
        </Col>
      </Row>
      <Row className="margin-top">
        <Col
          span={18}
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          Nhóm:
        </Col>
        <Col flex={3} style={{ display: "flex", justifyContent: "flex-start" }}>
          3 / 5
        </Col>
      </Row>
      <Row className="margin-top">
        <Col
          span={18}
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          Email:
        </Col>
        <Col flex={3} style={{ display: "flex", justifyContent: "flex-start" }}>
          3 / 5
        </Col>
      </Row>
      <Row className="margin-top">
        <Col
          span={18}
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          Số điện thoại:
        </Col>
        <Col flex={3} style={{ display: "flex", justifyContent: "flex-start" }}>
          3 / 5
        </Col>
      </Row>
      <Row className="margin-top">
        <Col
          span={18}
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <UserOutlined style={{ fontSize: "20px" }} />
        </Col>
        <Col flex={3} style={{ display: "flex", justifyContent: "flex-start" }}>
          3 / 5
        </Col>
      </Row>
    </>
  );
};
export default DescriptionContainer;
