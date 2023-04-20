import React, { Component } from "react";
import "./EditMovieModal.css";
// import { qLyAdminService } from "../../../services/QuanLyAdminService";
import swal from "sweetalert";
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, Upload } from 'antd';
import { useState } from 'react';
const { Option } = Select;
 const EditMovieModal = (props) => {
  // let { phim } = props;
  // let [statee, setStatee] = useState({
  //   values: {
  //     hinhAnh: phim.hinhAnh,
  //     maPhim: phim.maPhim,
  //     tenPhim: phim.tenPhim,
  //     biDanh: phim.biDanh,
  //     trailer: phim.trailer,
  //     moTa: phim.moTa,
  //     ngayKhoiChieu: phim.ngayKhoiChieu,
  //     danhGia: phim.danhGia,
  //     maNhom: groupID,
  //   },
  //   errors: {
  //     maPhim: "",
  //     tenPhim: "",
  //     biDanh: "",
  //     hinhAnh: "",
  //     trailer: "",
  //     moTa: "",
  //     ngayKhoiChieu: "",
  //     maNhom: "",
  //     danhGia: "",
  //   },
  // });
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
    //datepicker
    const onChange = (value, dateString) => {
      console.log("Selected Time: ", value);
      console.log("Formatted Selected Time: ", dateString);
    };
    const onOk = (value) => {
      console.log("onOk: ", value);
    };



 
  //Cho phần tải hình ảnh lên
  const [state, setState] = useState({
    selectedFile: null,
    selectedFileList: [],
  });
  const dummyRequest = ({ file, onSuccess }) => {
    console.log(file);
    // const url = URL.createObjectURL(file);
    // setFile(url);
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const propss = {
    name: "file",
    onChange(info) {
      const nextState = {};
      switch (info.file.status) {
        case "uploading":
          nextState.selectedFileList = [info.file];
          console.log(info.file, info.fileList);
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
  const handleChangeInput = (event) => {
    var { value, name } = event.target;
    var moment = require("moment");
    //tạo ra object this.state.values mới
    let newValues = {
      ...state.values,
      [name]: value,
    };
    let newErrors = {
      ...state.errors,
      [name]: value === "" ? "không được bỏ trống!" : "",
    };

    // if (name === "hinhAnh") {
    //   newValues[name] = event.target.files[0];
    // }
    if (name === "ngayKhoiChieu") {
      newValues[name] = moment(value, "yyyy-MM-DD").format("DD/MM/yyyy");
    }
    if (name === "maPhim") {
      let regexNumberic = /^[0-9]*$/;
      if (value.match(regexNumberic)) {
        newErrors.maPhim = "";
      } else {
        newErrors.maPhim = "Mã phim chỉ là số";
      }
    }
    // if (name === "danhGia") {
    //   let regexNumberic = /^[0-9]*$/;
    //   if (value <= 10 && value >= 0 && value.match(regexNumberic)) {
    //     newErrors.danhGia = "";
    //   } else {
    //     newErrors.danhGia = "Chỉ được nhập số từ 1 tới 10";
    //   }
    // }
    setState({ values: newValues, errors: newErrors });
  };


  // Hết phần hình ảnh
  
    return (
      <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Chỉnh sửa film
      </Button>
      <Drawer
        title="Chỉnh sửa phim mới"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Dừng</Button>
            <Button onClick={onClose} type="primary">
              Tạo mới
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Tên film"
                rules={[
                  {
                    required: true,
                    message: 'Nhập tên film',
                  },
                ]}
              >
                <Input onChange={handleChangeInput} placeholder="Nhập tên film" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="url"
                label="Url"
                rules={[
                  {
                    required: true,
                    message: 'Đường dẫn đến phim trailer',
                  },
                ]}
              >
                <Input
                  style={{
                    width: '100%',
                  }}
                  addonBefore="http://"
                  addonAfter=".com"
                  placeholder="Đường dẫn đến phim trailer"
                  onChange={handleChangeInput}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
          <Col span={12}>
              <Form.Item
                name="type"
                label="Loại phim"
                rules={[
                  {
                    required: true,
                    message: 'Chọn loại phim',
                  },
                ]}
              >
                <Select  placeholder="Please choose the type">
                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="Ngày khởi chiếu"
                rules={[
                  {
                    required: true,
                    message: 'Nhập ngày',
                  },
                ]}
              >
                <DatePicker onChange={handleChangeInput} showTime  onOk={onOk} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Mô tả"
                rules={[
                  {
                    required: true,
                    message: 'Nhập mô tả  film',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="Nhập mô tả  film" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
            <Form.Item
          name="hinh_anh"
          label="Chọn hình ảnh"
          rules={[
            {
              required: true,
              message: "Hãy tải lên một hình ảnh",
            },
          ]}
        >
          <Upload
            {...propss}
            fileList={state.selectedFileList}
            customRequest={dummyRequest}
          >
            <Button icon={<UploadOutlined />}>Nhấn vào đây để tải ảnh</Button>
          </Upload>
        </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
    );
  }
export default EditMovieModal;
  

