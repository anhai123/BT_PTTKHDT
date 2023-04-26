import React, { useEffect, useState } from "react";
import axios from "axios";
import moderaterService from "../services/moderator-service";
const FilmsAPI = () => {
  const [film, setfilm] = useState([]);
  const [callback, setCallback] = useState(false);
  const [categorySelected, setCategorySelected] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);
  const [resetSeat, setResetSeat] = useState([]);

  useEffect(() => {
    const getfilm = async () => {
      const response = await moderaterService.getFilmList().then((response) => {
        return response;
      });

      const _data = response;
      var __data = [];
      for (let i = 0; i < _data.length; i++) {
        _data[i]["key"] = _data[i].movie_id;
        __data.push(_data[i]);
      }
      setfilm(__data);

      // const response = await axios.get(
      //   `https://selling-product.vercel.app/film?limit=${
      //     page * 15
      //   }&${categorySelected}&${sort}&title[regex]=${search}`
      // );

      // const response = await axios.get(`/film`);
      // console.log(response);
      // setfilm(response.data.film);
      // setResult(response.data.result);
    };
    getfilm();
  }, [callback, categorySelected, sort, search, page]);

  return {
    film: [film, setfilm],
    callback: [callback, setCallback],
    categorySelected: [categorySelected, setCategorySelected],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
    resetSeat: [resetSeat, setResetSeat],
  };
};

export default FilmsAPI;
