import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8081/api/test/";
const API_URL2 = "http://localhost:8081/api/customer/";
const API_URL3 = "http://localhost:8081/api/information";
const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};
const getFilmByType = (type) => {
  return axios
    .get(API_URL2 + "search-film/type" + `/${type}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getFilmScreeningPerFilm = () => {
  return axios
    .get("http://localhost:8081/api/customer/screening", {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const getSeat = (screenId) => {
  return axios
    .get(API_URL2 + "seat/" + `${screenId}`, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const putSelectSeat = (seat_id, room_id) => {
  return axios
    .put(
      API_URL2 + "seat",
      { seat_id, room_id },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};

const putCancelSelectSeat = (seat_ids) => {
  return axios
    .put(
      API_URL2 + "seat/cancel",
      { seat_ids },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};
const paymentFilm = (seat_ids, prices, amount, screening_id) => {
  return axios
    .post(
      API_URL2 + "payment",
      { seat_ids, prices, amount, screening_id },
      { headers: authHeader() }
    )
    .then((response) => {
      return response.data;
    });
};
const getBookingTicket = () => {
  return axios
    .get(API_URL2 + "booking", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
const deleteBooking = (deleteId) => {
  const array = [deleteId];
  return axios.delete(API_URL2 + "booking", {
    headers: authHeader(),
    data: {
      ids: array,
    },
  });
};
const getAllUserInfor = () => {
  return axios.get(API_URL3, { headers: authHeader() }).then((response) => {
    return response.data;
  });
};
const putUserInfor = (value, brithday) => {
  return axios
    .put(
      API_URL3,
      { ...value, brithday },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};
const userService = {
  putUserInfor,
  getAllUserInfor,
  deleteBooking,
  getBookingTicket,
  paymentFilm,
  putCancelSelectSeat,
  putSelectSeat,
  getSeat,
  getFilmScreeningPerFilm,
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getFilmByType,
};

export default userService;
