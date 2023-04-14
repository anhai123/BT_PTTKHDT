import React, { useState, Fragment, useMemo } from "react";
// import { qLyPhimService } from "../services/QuanLyPhimServices";
import MovieInfo from "../components/DetailMovie/MovieInfo/MovieInfo";

const DetailMovie = (props) => {
  let [phim, setPhim] = useState([]);
  const [loading, $loading] = useState(true);

  return (
    <Fragment>
      <>
        <MovieInfo phimItem={phim} />
      </>
    </Fragment>
  );
};

export default DetailMovie;
