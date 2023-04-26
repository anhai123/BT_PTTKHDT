import React, { useState, useContext, useEffect } from "react";
import "./AddMovieModal.css";
// import { qLyAdminService } from "../../../services/QuanLyAdminService";
import swal from "sweetalert";
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, InputNumber, Row, Select, Space, Upload , message} from 'antd';

import moderaterService from "../../../services/moderator-service";
import { GlobalState } from "../../../GlobalState";
const { Option } = Select;
 const AddMovieModal = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const statee = useContext(GlobalState);
  const [callback, setCallback] = statee.filmsAPI.callback;
  const showDrawer = () => {
    setOpen(true);
  };

  const summitForm = async () => {
    const values = await form.validateFields().then((val) => {
      return val
    });
    moderaterService.addNewMovie(values).then(
      (response) => {
        message.success("Tạo phim thành công");
        
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
            <Button onClick={summitForm} type="primary">
              Tạo mới
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical" >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
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
                name="trailer"
                label="Link trailer"
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
            <Col span={24}>
              <Form.Item
                name="poster_ulr"
                label="Link poster"
                rules={[
                  {
                    required: true,
                    message: 'Đường dẫn đến poster phim',
                  },
                ]}
              >
                <Input
                  style={{
                    width: '100%',
                  }}
                  addonBefore="http://"
                  addonAfter=".com"
                  placeholder="Đường dẫn đến phim poster"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
          <Col span={12}>
              <Form.Item
                name="genre"
                label="Loại phim"
                rules={[
                  {
                    required: true,
                    message: 'Chọn loại phim',
                  },
                ]}
              >
                <Select placeholder="Chọn loại phim phù hợp">
                  <Option value="horror">Kinh dị</Option>
                  <Option value="dramatic">Chính kịch</Option>
                  <Option value="romantic">Lãng mạn</Option>
                  <Option value="funny">Hài</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="release_date"
                label="Ngày khởi chiếu"
                rules={[
                  {
                    required: true,
                    message: 'Nhập ngày',
                  },
                ]}
              >
                <DatePicker  onChange={onChange} onOk={onOk} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
          <Col span={12}>
              <Form.Item
                name="poster_ulr"
                label="Poster"
                rules={[
                  {
                    required: true,
                    message: 'Chọn ảnh',
                  },
                ]}
              >
              <Input placeholder="Nhập link" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="duration"
                label="Thời lượng chiếu"
                rules={[
                  {
                    required: true,
                    message: 'Nhập thời lượng',
                  },
                ]}
              >
               <InputNumber placeholder="Nhập thời lượng" />
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
        </Form>
      </Drawer>
    </>
    );
  }
export default AddMovieModal;
  

