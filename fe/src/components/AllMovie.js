import React, { useState, useEffect } from "react";

import TatcaMovie from "./Movie/Movie";
// import MovieItem from "../MovieItem/MovieItem";

export default function AllMovie() {
  const renderDanhSachPhim = () => {
    // return danhSachPhimSearch.map((phim, index) => {
    //   return <MovieItem phimItem={phim} key={index} />;
    // });
  };

  return (
    <>
      <TatcaMovie />
    </>
  );
}
