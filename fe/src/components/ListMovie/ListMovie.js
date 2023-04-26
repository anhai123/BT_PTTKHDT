import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu, Row, Col } from "antd";
import { useState } from "react";

// type (Sắp chiếu, Đang chiếu, Suất chiếu sớm)

const items = [
  {
    label: "Đang chiếu",
    key: "Đang chiếu",
    icon: <MailOutlined />,
  },
  {
    label: "Sắp chiếu",
    key: "Sắp chiếu",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Xuất chiếu sớm",
    key: "Suất chiếu sớm",
    icon: <AppstoreOutlined />,
  },
];
const ListMovie = (props) => {
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    props.selectTypeFilm(e.key);
  };
  return (
    <Row type="flex" justify="center" align="center">
      <Col style={{ paddingBottom: "20px" }}>
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
