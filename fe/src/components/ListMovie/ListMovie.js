import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu, Row, Col } from "antd";
import { useState } from "react";
const items = [
  {
    label: "Đang chiếu",
    key: "on_show",
    icon: <MailOutlined />,
  },
  {
    label: "Sắp chiếu",
    key: "pre_show",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Xuất chiếu sớm",
    key: "early_bird",
    icon: <AppstoreOutlined />,
  },
];
const ListMovie = () => {
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <Row type="flex" justify="center" align="center">
      <Col>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </Col>
    </Row>
  );
};
export default ListMovie;
