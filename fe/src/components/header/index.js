import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Input,
  Space,
  Badge,
} from "antd";
import "./header.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import authService from "../../services/auth.service";
import { GlobalState } from "../../GlobalState";
const { Search } = Input;
const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const HeaderCom = () => {
  const location = useLocation();
  let routePathPattern = location.pathname;
  console.log("routePathPattern", routePathPattern);
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
  const [categories] = state.categoriesAPI.categories;

  const handleCategory = (value) => {};

  const logoutUser = async () => {
    authService.logout();

    window.location.href = "/"; // refresh page
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const adminRouter = [
    {
      key: "manage_film",
      label: <Link to="/manage-film">Phim</Link>,
    },
    {
      key: "manage_show_time",
      label: <Link to="/show-time">Lịch chiếu</Link>,
    },
    {
      key: "manage_account",
      label: <Link to="/accounts">Tài khoản</Link>,
    },

    {
      key: "manage_history",
      label: <Link to="/ticket-history">Lịch sử vé</Link>,
    },
    {
      key: "manage_profile",
      label: <Link to="/user-infor">Profile</Link>,
    },
    isLogged && {
      key: "logout",
      label: (
        <Link to="/" onClick={logoutUser}>
          Logout
        </Link>
      ),
    },
  ];

  const loggedRouter = [
    isLogged && {
      key: "logout",
      label: (
        <Link to="/" onClick={logoutUser}>
          Logout
        </Link>
      ),
    },
    // {
    //   key: "cart",
    //   label: (
    //     <Badge count={cart.length} size="small">
    //       <Link to="/cart">
    //         <ShoppingCartOutlined
    //           style={{ fontSize: "24px", color: "white" }}
    //           size="medium"
    //         />
    //       </Link>
    //     </Badge>
    //   ),
    // },
  ];

  let ItemsNavbar = [
    // {
    //   key: "shop",
    //   label: <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>,
    // },
    !isLogged && {
      key: "login",
      label: <Link to="/login">Login</Link>,
    },
    !isLogged && {
      key: "regis",
      label: <Link to="/register">Register</Link>,
    },

    ...loggedRouter,
  ];
  if (isAdmin) {
    ItemsNavbar = [...adminRouter];
  }
  let ItemsCategory = [];
  let getAllProduct = {
    key: "allProduct",
    label: (
      <span onClick={() => handleCategory("")} key="allProduct">
        All products
      </span>
    ),
  };
  if (categories) {
    ItemsCategory = categories.map((category) => {
      return {
        key: category._id,
        label: (
          <span
            onClick={() => handleCategory("category=" + category._id)}
            key={category._id}
          >
            {category.name}
          </span>
        ),
      };
    });
  }

  ItemsCategory = [getAllProduct].concat(ItemsCategory);

  return (
    <Layout className="layout">
      <Header style={{ boxSizing: "border-box", height: "5rem" }}>
        <div className="site-space-compact-wrapper">
          <Space.Compact block>
            <Text
              style={{
                color: "#ff8637",
                width: "15%",
                position: "relative",
                fontSize: "1.5rem",
                transform: "translate(0%, 20%)",
                marginRight: "1rem",
              }}
              italic
            >
              <Link to="/">{isAdmin ? "Admin" : "Galaxy Cinema"}</Link>
            </Text>
            {/* <Input.Search
              style={{
                position: "relative",
                width: "60%",

                transform: "translate(0%, 25%)",
              }}
              defaultValue="0571"
              value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            /> */}

            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              items={ItemsNavbar}
              style={{
                width: "50%",
                display: "flex",
                fontSize: "1.2rem",
                color: "white",
              }}
            />

            <br />
          </Space.Compact>
        </div>
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        ></div>
      </Content>
    </Layout>
  );
};
export default HeaderCom;
