import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, Row, Col, Card, message } from "antd";
import * as Yup from "yup";
import authService from "../services/auth.service";
import { useField, useFormikContext } from "formik";
const Register = () => {
  const [successful, setSuccessful] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    fullname: "",
    address: "",
    phone: "",
    role_id: "",
    gender: "",
    brithday: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("This field is required!"),
  });
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  const handleRegister = (formValue) => {
    const {
      username,
      email,
      password,
      fullname,
      address,
      phone,
      role_id,
      gender,
      brithday,
    } = formValue;
    console.log(
      username,
      email,
      password,
      fullname,
      address,
      phone,
      role_id,
      gender,
      brithday
    );
    var brithdayy = convert(brithday);
    setSuccessful(false);

    authService
      .register(
        role_id,
        username,
        password,
        fullname,
        gender,
        brithdayy,
        address,
        email,
        phone
      )
      .then(
        (response) => {
          console.log(response);
          message.success("register successfully");
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          console.log(_content);
          message.error("register fail");
        }
      );
  };
  const DatePickerField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
        dateFormat="yyyy/MM/dd"
      />
    );
  };
  return (
    <div className="col-md-12 signup-form">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div>
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
                  <label htmlFor="fullname">Full name</label>
                  <Field name="fullname" type="text" className="form-control" />
                  <ErrorMessage
                    name="fullname"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <Field name="address" type="text" className="form-control" />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="role_id">Role</label>
                  <Field name="role_id" type="text" className="form-control" />
                  <ErrorMessage
                    name="role_id"
                    component="div"
                    className="alert alert-danger"
                  />
                </div> */}
                <div className="form-group">
                  <label htmlFor="role_id">Role</label>
                  <Field as="select" name="role_id">
                    <option value="1">Ban điều hành</option>
                    <option value="2">Nhân viên</option>
                    <option value="3">Khách hàng</option>
                  </Field>
                </div>

                <div className="form-group">
                  <label htmlFor="brithday">Birthday</label>
                  <DatePickerField name="brithday" />
                  <ErrorMessage
                    name="brithday"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone number</label>
                  <Field name="phone" type="text" className="form-control" />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <Field name="gender" type="text" className="form-control" />
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign Up
                  </button>
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
