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
  const [isEmployee, setIsEmployee] = state.userAPI.isEmployee;
  const [isCustomer, setIsCustomer] = state.userAPI.isCustomer;
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
      label: (
        <Link
          style={{
            color: "white",
          }}
          to=""
        >
          Quản lý phim
        </Link>
      ),
      children: [
        {
          label: <Link to="/add-film">Thêm phim</Link>,
          key: "add_new_film",
        },
        {
          key: "manage_show_time",
          label: <Link to="/show-time">Lịch chiếu</Link>,
        },
        {
          key: "manage_film",
          label: <Link to="/admin-search-movie">Kho phim</Link>,
        },
      ],
    },

    {
      key: "manage_account",
      label: <Link to="/accounts">Tài khoản</Link>,
    },
    {
      key: "manage_account_checked",
      label: <Link to="/accounts-checked">Tài khoản hệ thống</Link>,
    },
  ];
  const employeeRouter = [
    {
      key: "manage_ticket_employee",
      label: <Link to="/ticket-employee">Lọc vé</Link>,
    },
  ];
  const commonRouter = [
    {
      key: "manage_profile",
      label: <Link to="/user-infor">Profile</Link>,
    },
    {
      key: "search_film",
      label: <Link to="/search-film-by-name">Tìm kiếm phim</Link>,
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
  let ItemsNavbar = [
    !isLogged && {
      key: "login",
      label: <Link to="/login">Login</Link>,
    },
    !isLogged && {
      key: "regis",
      label: <Link to="/register">Register</Link>,
    },
  ];

  if (isAdmin) {
    ItemsNavbar = [...adminRouter, ...commonRouter];
  }
  if (isEmployee) {
    ItemsNavbar = [...employeeRouter, ...commonRouter];
  }
  if (isCustomer) {
    ItemsNavbar = [
      ,
      // {
      //   key: "manage_history",
      //   label: <Link to="/ticket-history">Lịch sử vé</Link>,
      // },
      ...commonRouter,
    ];
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
              <Link to="/home">{isAdmin ? "Admin" : "Galaxy Cinema"}</Link>
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
                width: "70%",
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
