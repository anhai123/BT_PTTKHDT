import React, { useEffect, useState } from "react";
import axios from "axios";
const FilmsAPI = () => {
  const [film, setfilm] = useState([]);
  const [callback, setCallback] = useState(false);
  const [categorySelected, setCategorySelected] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const getfilm = async () => {
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
  };
};

export default FilmsAPI;