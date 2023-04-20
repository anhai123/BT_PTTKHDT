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
} from "antd";
import { useState } from "react";

const { RangePicker } = DatePicker;
const { Option } = Select;
const CreateShowTime = () => {
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
            <Button onClick={onClose} type="primary">
              Thêm lịch
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Chọn phim"
                rules={[
                  {
                    required: true,
                    message: "--Chọn phim--",
                  },
                ]}
              >
                <Input placeholder="Chọn phim" />
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
                name="dateTime"
                label="Ngày giờ chiếu"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn ngày giờ chiếu",
                  },
                ]}
              >
                <Space direction="vertical" size={12}>
                  <DatePicker showTime onChange={onChange} onOk={onOk} />
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
