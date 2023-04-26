import React, { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GlobalState } from "../../GlobalState";

import authService from "../../services/auth.service";
import { Button, Checkbox, Input, Row, Col, Card, Space, message } from "antd";
const ChangePassWithVerification = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    user_name: "",
    passwordNew: "",
    passwordNewAgain: "",
  };
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [callback, setCallback] = state.userAPI.callback;
  var islog = state.userAPI.isLogged[0];
  const validationSchema = Yup.object().shape({
    user_name: Yup.string().required("This field is required!"),
    passwordNew: Yup.string().required("This field is required!"),
    passwordNewAgain: Yup.string().required("This field is required!"),
  });

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    authService
      .forgotPasswordAndUpdateNewPass(
        values.user_name,
        localStorage.getItem("verification_code"),
        values.passwordNew,
        values.passwordNewAgain
      )
      .then(
        (response) => {
          // setUserInfo(response);
          // setIslog(true);
          // state.userAPI.isLogged.setIsLogged(true);
          console.log(response);
          message.success("Cập nhật mật khẩu mới thành công");
          localStorage.removeItem("verification_code");
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
          onSubmit={(values) => {
            onFinish(values);
          }}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="user_name">Nhập username</label>
              <Field name="user_name" type="text" className="form-control" />
              <ErrorMessage
                name="user_name"
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
              <label htmlFor="passwordNewAgain">Nhập lại mật khẩu</label>
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
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Cập nhật mật khẩu</span>
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

export default ChangePassWithVerification;
