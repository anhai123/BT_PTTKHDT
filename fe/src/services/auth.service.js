import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/auth/";

const register = (
  role_id,
  user_name,
  password,
  full_name,
  gender,
  brithday,
  address,
  email,
  phone
) => {
  return axios
    .post(API_URL + "signup", {
      role_id,
      user_name,
      password,
      full_name,
      gender,
      brithday,
      address,
      email,
      phone,
    })
    .then((response) => {
      return response.data;
    });
};

const login = (user_name, password) => {
  return axios
    .post(API_URL + "signin", {
      user_name,
      password,
    })
    .then((response) => {
      console.log(response);
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};
const changePassword = (passwordOld, passwordNew, passwordNewAgain) => {
  return axios
    .put(
      API_URL + "change-password",
      {
        passwordOld,
        passwordNew,
        passwordNewAgain,
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};

const forgotPassword = (user_name, email) => {
  return axios
    .put(API_URL + "forgot-password", {
      user_name,
      email,
    })
    .then((response) => {
      return response.data;
    });
};

const forgotPasswordSendOTP = (user_name, verification_code) => {
  return axios
    .put(API_URL + "forgot-password/otp-verification", {
      user_name,
      verification_code,
    })
    .then((response) => {
      return response.data;
    });
};

const forgotPasswordAndUpdateNewPass = (
  user_name,
  verification_code,
  passwordNew,
  passwordNewAgain
) => {
  return axios
    .put(API_URL + "forgot-password/change-password", {
      user_name,
      verification_code,
      passwordNew,
      passwordNewAgain,
    })
    .then((response) => {
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
