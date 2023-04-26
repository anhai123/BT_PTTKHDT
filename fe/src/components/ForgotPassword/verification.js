import React, { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GlobalState } from "../../GlobalState";

import authService from "../../services/auth.service";
import { Button, Checkbox, Input, Row, Col, Card, Space, message } from "antd";
const Verification = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [updatePassword, setupdatePassword] = useState(false);
  const initialValues = {
    user_name: "",
    verification: "",
  };
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [callback, setCallback] = state.userAPI.callback;
  var islog = state.userAPI.isLogged[0];
  const validationSchema = Yup.object().shape({
    user_name: Yup.string().required("This field is required!"),
    verification: Yup.string().required("This field is required!"),
  });

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    authService
      .forgotPasswordSendOTP(values.user_name, values.verification)
      .then(
        (response) => {
          // setUserInfo(response);
          // setIslog(true);
          // state.userAPI.isLogged.setIsLogged(true);
          console.log(response);
          message.success("Xác nhận verification code thành công");
          localStorage.setItem("verification_code", response.verification_code);
          setupdatePassword(true);
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
  if (updatePassword) {
    return <Navigate to="/update-password" />;
  }

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
              <label htmlFor="verification">Mã verification</label>
              <Field name="verification" type="text" className="form-control" />
              <ErrorMessage
                name="verification"
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
                <span>Quên mật khẩu</span>
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

export default Verification;
