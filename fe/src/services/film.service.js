import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/customer/";
const searchFilmByName = (title) => {
  return axios
    .get(API_URL + "search-film" + `/${title}`, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const confirmTicket = (booking_id) => {
  return axios.delete(API_URL + "booking", {
    headers: authHeader(),
    data: {
      booking_id,
    },
  });
};
const filmService = {
  searchFilmByName,
  confirmTicket,
};
export default filmService;
