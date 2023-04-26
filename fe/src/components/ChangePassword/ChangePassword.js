import React, { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GlobalState } from "../../GlobalState";

import authService from "../../services/auth.service";
import { Button, Checkbox, Input, Row, Col, Card, Space, message } from "antd";
const ChangePassWord = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    passwordOld: "",
    passwordNew: "",
    passwordNewAgain: "",
  };
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [callback, setCallback] = state.userAPI.callback;
  var islog = state.userAPI.isLogged[0];
  const validationSchema = Yup.object().shape({
    passwordOld: Yup.string().required("This field is required!"),
    passwordNew: Yup.string().required("This field is required!"),
    passwordNewAgain: Yup.string().required("This field is required!"),
  });

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    authService
      .changePassword(
        values.passwordOld,
        values.passwordNew,
        values.passwordNewAgain
      )
      .then(
        (response) => {
          // setUserInfo(response);
          // setIslog(true);
          // state.userAPI.isLogged.setIsLogged(true);

          message.success("Thay mật khẩu thành công");
          setCallback(!callback);
          window.location.href = "/";
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
  console.log(islog);
  // if (isLogged) {
  //   return <Navigate to="/user-infor" />;
  // }

  return (
    <div className="col-md-12 login-form">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onFinish}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="passwordOld">Mật khẩu cũ</label>
              <Field
                name="passwordOld"
                type="password"
                className="form-control"
              />
              <ErrorMessage
                name="passwordOld"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="passwordNew">Mật khẩu mới</label>
              <Field
                name="passwordNew"
                type="password"
                className="form-control"
              />
              <ErrorMessage
                name="passwordNew"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordNewAgain">Nhập lại</label>
              <Field
                name="passwordNewAgain"
                type="password"
                className="form-control"
              />
              <ErrorMessage
                name="passwordNewAgain"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                <span>Đổi mật khẩu</span>
              </button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingTop: "1rem",
                }}
              ></div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ChangePassWord;
