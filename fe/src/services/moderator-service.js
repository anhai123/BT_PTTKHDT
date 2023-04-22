import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/moderator/";
const getNeedAcceptAccount = () => {
  return axios
    .get(API_URL + "account", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const acceptAccount = (ids) => {
  return axios
    .put(
      API_URL + "account",
      { ids },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};

const notAcceptAccount = (ids) => {
  return axios
    .put(
      API_URL + "account",
      { ids },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};
const rejectWaitingAccount = (updateId) => {
  return axios.delete(API_URL + "account", {
    headers: authHeader(),
    data: {
      ids: updateId,
    },
  });
};
const searchEmployeeAccount = (fullName) => {
  return axios
    .get(API_URL + "account" + `/${fullName}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const addNewMovie = (
  title,
  description,
  genre,
  duration,
  trailer,
  release_date,
  poster_ulr
) => {
  return axios.post(
    API_URL + "film",
    {
      title,
      description,
      genre,
      duration,
      trailer,
      release_date,
      poster_ulr,
    },
    {
      headers: authHeader(),
    }
  );
};
const findFilmForUpdate = (title) => {
  return axios
    .get(API_URL + "search-film" + `/${title}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
const updateFilmInfor = (
  movie_id,
  title,
  description,
  genre,
  duration,
  trailer,
  release_date,
  poster_ulr
) => {
  return axios
    .put(
      API_URL + "film",
      {
        movie_id,
        title,
        description,
        genre,
        duration,
        trailer,
        release_date,
        poster_ulr,
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};
const deleteFilm = (deleteId) => {
  return axios.delete(API_URL + "film", {
    headers: authHeader(),
    data: {
      ids: deleteId,
    },
  });
};
const moderaterService = {
  getNeedAcceptAccount,
  acceptAccount,
  notAcceptAccount,
  rejectWaitingAccount,
  searchEmployeeAccount,
  addNewMovie,
  findFilmForUpdate,
  updateFilmInfor,
  deleteFilm,
};
export default moderaterService;
