import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  message,
} from "antd";
import { useEffect, useState } from "react";
import moderaterService from "../../../services/moderator-service";
const { RangePicker } = DatePicker;
const { Option } = Select;
const CreateShowTime = () => {
  const [roomAndPhim, setRoomAndPhim] = useState({ rooms: [], movies: [] });
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [date, setDate] = useState("");
  const showDrawer = async () => {
    await moderaterService.getDataAddShowTime().then(
      (response) => {
        // setUserInfo(response);
        // setIslog(true);
        // state.userAPI.isLogged.setIsLogged(true);
        message.success("Lấy data về phim và phòng chiếu thành công");
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
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  //datepicker
  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    setDate(dateString);
    form.setFieldValue("start_time", dateString);
  };
  const onOk = async () => {
    const value = await form.validateFields();
    console.log(value);
    await moderaterService.postShowTime(value).then(
      (response) => {
        // setUserInfo(response);
        // setIslog(true);
        // state.userAPI.isLogged.setIsLogged(true);

        message.success("Thêm lịch thành công");
        form.resetFields();
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
  useEffect(() => {
    moderaterService.getDataAddShowTime().then(
      (response) => {
        console.log(response);

        setRoomAndPhim(response);
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
  }, [open]);
  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Thêm lịch chiếu phim
      </Button>
      <Drawer
        title="Thêm lịch chiếu phim"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Dừng</Button>
            <Button onClick={onOk} type="primary">
              Thêm lịch
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="room_id"
                label="Chọn phòng chiếu"
                rules={[
                  {
                    required: true,
                    message: "--Chọn phòng chiếu--",
                  },
                ]}
              >
                <Select placeholder="Chọn tên phòng chiếu muốn thêm" allowClear>
                  {roomAndPhim.rooms.map((room, index) => {
                    return (
                      <Option value={room.room_id}>{room.room_name}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="movie_id"
                label="Chọn phim"
                rules={[
                  {
                    required: true,
                    message: "--Chọn phim--",
                  },
                ]}
              >
                <Select placeholder="Chọn tên phim muốn thêm" allowClear>
                  {roomAndPhim.movies.map((movie, index) => {
                    return (
                      <Option value={movie.movie_id}>{movie.title}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="ticket-price"
                label="Giá vé"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn giá vé phù hợp",
                  },
                ]}
              >
                <Select placeholder="Hãy chọn giá vé phù hợp">
                  <Option value="75000">75.000đ</Option>
                  <Option value="95000">90.000đ</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="start_time"
                label="Ngày giờ chiếu"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn ngày giờ chiếu",
                  },
                ]}
              >
                <Space direction="vertical" size={12}>
                  <DatePicker showTime onChange={onChange} />
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default CreateShowTime;
