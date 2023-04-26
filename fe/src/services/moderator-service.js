import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/moderator/";
const API_FOR_FILM_URL = "http://localhost:8080/api/";
const getNeedAcceptAccount = () => {
  return axios
    .get(API_URL + "account", { headers: authHeader() })
    .then((response) => {
      console.log("dong 9 mod serv");
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      return err.status;
    });
};
const getFilmList = () => {
  return axios
    .get(API_FOR_FILM_URL + "film", { headers: authHeader() })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      return err.status;
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

// const notAcceptAccount = (ids) => {
//   return axios
//     .delete(
//       API_URL + "account",
//       { ids },
//       {
//         headers: authHeader(),
//       }
//     )
//     .then((response) => {
//       return response.data;
//     });
// };
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

const addNewMovie = (inf) => {
  return axios.post(
    API_URL + "film",
    {
      ...inf,
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
const updateFilmInfor = (inf) => {
  return axios
    .put(
      API_URL + "film",
      {
        ...inf,
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
const getDataAddShowTime = (deleteId) => {
  return axios
    .get(API_URL + "screening", { headers: authHeader() })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      return err.status;
    });
};

const postShowTime = (inf) => {
  return axios
    .post(
      API_URL + "screening",
      {
        ...inf,
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      return err.status;
    });
};
const moderaterService = {
  postShowTime,
  getDataAddShowTime,
  getNeedAcceptAccount,
  acceptAccount,
  rejectWaitingAccount,
  searchEmployeeAccount,
  addNewMovie,
  findFilmForUpdate,
  updateFilmInfor,
  deleteFilm,
  getFilmList,
};
export default moderaterService;
