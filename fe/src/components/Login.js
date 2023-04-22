import React, { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GlobalState } from "../GlobalState";
import { login } from "../slices/auth";
import { clearMessage } from "../slices/message";
import authService from "../services/auth.service";
import { Button, Checkbox, Input, Row, Col, Card, Space, message } from "antd";
const Login = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    username: "",
    password: "",
  };
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const onFinish = (values) => {
    const setUserInfo = state.userAPI.userInfo[1];
    const setIslog = state.userAPI.isLogged[1];

    console.log("Received values of form: ", values);
    authService.login(values.username, values.password).then(
      (response) => {
        setUserInfo(response);
        setIslog(true);
        // state.userAPI.isLogged.setIsLogged(true);

        message.success("login successfully");
        // window.location.href = "/";
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
  console.log(isLogged);
  if (isLogged) {
    return <Navigate to="/user-infor" />;
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
          onSubmit={onFinish}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
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
                <span>Login</span>
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
