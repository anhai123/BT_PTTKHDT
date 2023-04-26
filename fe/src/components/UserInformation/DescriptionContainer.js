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
  Modal,
  Radio,
} from "antd";
import { UploadOutlined, PaperClipOutlined } from "@ant-design/icons";
import { GlobalState } from "../../GlobalState";
import { UserOutlined } from "@ant-design/icons";
import "./DescriptionContainer.css";
import React, { useState, useEffect, useContext } from "react";
import userService from "../../services/user.service";
import authService from "../../services/auth.service";
const { Header, Footer, Sider, Content } = Layout;
const key = "updatable";
const CollectionCreateForm = ({ open, onCreate, onCancel, usIn }) => {
  const [form] = Form.useForm();
  console.log(usIn);
  return (
    <Modal
      open={open}
      title="Cập nhật thông tin cá nhân"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          ...usIn,
        }}
      >
        <Form.Item
          name="full_name"
          label="Tên đầy đủ"
          rules={[
            {
              required: true,
              message: "Nhập họ tên",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Địa chỉ">
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Số điện thoại">
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          className="collection-create-form_last-form-item"
        >
          <Radio.Group>
            <Radio value="male">Nam</Radio>
            <Radio value="female">Nữ</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};
const logoutUser = async () => {
  authService.logout();

  window.location.href = "/"; // refresh page
};
const DescriptionContainer = (props) => {
  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setOpen(false);

    userService.putUserInfor(values, props.usIn.brithday).then(
      (response) => {
        // setUserInfo(response);
        // setIslog(true);
        // state.userAPI.isLogged.setIsLogged(true);

        message.success("Cập nhật thông tin thành công");
        setCallback(!callback);
        logoutUser();
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
  };
  let navigate = useNavigate();
  const state = useContext(GlobalState);
  const [userInfo, setUserInfo] = state.userAPI.userInfo;
  const [callback, setCallback] = state.userAPI.callback;
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
  // const props = {
  //   name: "file",
  //   onChange(info) {
  //     const nextState = {};
  //     switch (info.file.status) {
  //       case "uploading":
  //         nextState.selectedFileList = [info.file];
  //         break;
  //       case "done":
  //         nextState.selectedFile = info.file;
  //         nextState.selectedFileList = [info.file];
  //         break;

  //       default:
  //         // error or removed
  //         nextState.selectedFile = null;
  //         nextState.selectedFileList = [];
  //     }
  //     setState(nextState);
  //   },
  //   progress: {
  //     strokeColor: {
  //       "0%": "#108ee9",
  //       "100%": "#87d068",
  //     },
  //     strokeWidth: 3,
  //     format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
  //   },
  // };

  const cancel = () => {
    setEditingKey("");
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
      {/* <Row className="margin-top">
        <Col
          span={12}
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          Tên đầy đủ
        </Col>
        <Col flex={3} style={{ display: "flex", justifyContent: "flex-start" }}>
          {userInfo.full_name}
        </Col>
      </Row> */}
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
      <br></br>
      <Row>
        <div>
          <Button
            type="primary"
            onClick={() => {
              setOpen(true);
            }}
          >
            Cập nhật thông tin cá nhân
          </Button>
          <CollectionCreateForm
            open={open}
            onCreate={onCreate}
            onCancel={() => {
              setOpen(false);
            }}
            usIn={props.usIn}
          />
        </div>
      </Row>
    </>
  );
};
export default DescriptionContainer;
