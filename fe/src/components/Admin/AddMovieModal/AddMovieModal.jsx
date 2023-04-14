import React, { Component } from "react";
import "./AddMovieModal.css";
// import { qLyAdminService } from "../../../services/QuanLyAdminService";
import swal from "sweetalert";
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, Upload } from 'antd';
import { useState } from 'react';
const { Option } = Select;
 const AddMovieModal = () => {
//  const  state = {
//     values: {
//       maPhim: "",
//       tenPhim: "",
//       biDanh: "",
//       hinhAnh: {},
//       trailer: "",
//       moTa: "",
//       ngayKhoiChieu: "",
//       danhGia: "",
//       maNhom: "",
//     },
//     errors: {
//       maPhim: "",
//       tenPhim: "",
//       biDanh: "",
//       hinhAnh: "",
//       trailer: "",
//       moTa: "",
//       ngayKhoiChieu: "",
//       danhGia: "",
//       maNhom: "",
//     },
//   };
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



  // handleChangeInput = (event) => {
  //   var { value, name } = event.target;
  //   //tạo ra object this.state.values mới
  //   let newValues = {
  //     ...this.state.values,
  //     [name]: value,
  //   };
  //   let newErrors = {
  //     ...this.state.errors,
  //     [name]: value === "" ? "không được bỏ trống!" : "",
  //   };

  //   if (name === "hinhAnh") {
  //     newValues[name] = event.target.files[0];
  //   }
  //   if (name === "ngayKhoiChieu") {
  //     var moment = require("moment");
  //     // console.log(value);
  //     newValues[name] = moment(value, "yyyy-MM-DD").format("DD/MM/yyyy");
  //   }
  //   if (name === "danhGia") {
  //     let regexNumberic = /^[0-9]*$/;
  //     if (value <= 10 && value >= 0 && value.match(regexNumberic)) {
  //       newErrors.danhGia = "";
  //     } else {
  //       newErrors.danhGia = "Chỉ được nhập số từ 1 tới 10";
  //     }
  //   }

  //   this.setState({ values: newValues, errors: newErrors });
  // };
  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   let valid = true;
  //   let { values, errors } = this.state;

  //   for (let key in values) {
  //     if (values[key] === "") {
  //       // kiểm tra lỗi
  //       valid = false;
  //     }
  //   }
  //   for (let key in errors) {
  //     if (errors[key] !== "") {
  //       valid = false;
  //     }
  //   }
  //   if (!valid) {
  //     alert("thông tin không hợp lệ");
  //     return;
  //   } else {
  //     // gọi api hoạc dispatch redux
  //     var form_data = new FormData();
  //     for (let key in this.state.values) {
  //       form_data.append(key, this.state.values[key]);
  //     }
  //     qLyAdminService
  //       .themPhim(form_data)
  //       .then((res) => {
  //         swal({
  //           title: "Thêm phim thành công",
  //           icon: "success",
  //           button: "OK",
  //         });
  //         setTimeout(() => {
  //           window.location.reload();
  //         }, 2000);
  //       })
  //       .catch((err) => {
  //         swal({
  //           title: err.response.data,
  //           text: "Điền lại thông tin!",
  //           icon: "warning",
  //           button: "OK",
  //         });
  //       });
  //   }
  // };
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
  const props = {
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

  // Hết phần hình ảnh
  
    return (
      <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Tạo phim mới
      </Button>
      <Drawer
        title="Tạo phim mới"
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
                <Input placeholder="Nhập tên film" />
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
                <Select placeholder="Please choose the type">
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
                <DatePicker showTime onChange={onChange} onOk={onOk} />
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
            {...props}
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
export default AddMovieModal;
  

