import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/staff/";
const searchTicket = (bookingId) => {
  return axios
    .get(API_URL + "search-booking" + `/${bookingId}`, {
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
const employeeService = {
  searchTicket,
  confirmTicket,
};
export default employeeService;
