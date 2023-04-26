import React, { useState, Fragment, useMemo } from "react";
import { useLocation } from "react-router-dom";
import MovieInfo from "../components/DetailMovie/MovieInfo/MovieInfo";
import filmService from "../services/film.service";
import { Button, Checkbox, Input, Row, Col, Card, Space, message } from "antd";
const DetailMovie = (props) => {
  let [phim, setPhim] = useState([]);
  const [loading, $loading] = useState(true);
  const location = useLocation();
  console.log(location.state);
  return (
    <Fragment>
      <>
        <MovieInfo phimItem={location.state} />
      </>
    </Fragment>
  );
};

export default DetailMovie;
