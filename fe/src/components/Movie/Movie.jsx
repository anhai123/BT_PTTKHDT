import React, { useState, useEffect } from "react";
import "./Movie.scss";
// import SpinnerLoading from "../SpinnerLoading/SpinnerLoading";
// import MovieItem from "../MovieItem/MovieItem";

export default function AllMovie() {
  const renderDanhSachPhim = () => {
    // return danhSachPhimSearch.map((phim, index) => {
    //   return <MovieItem phimItem={phim} key={index} />;
    // });
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [danhSachPhimSearch, setDanhSachPhimSearch] = useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div className="container all-movie">
      <div className="search">
        <div id="wrap">
          <form autoComplete="on">
            <input
              id="search"
              name="search"
              type="text"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Nhập tên phim cần tìm"
            />
            <input id="search_submit" defaultValue="Rechercher" type="submit" />
          </form>
        </div>
      </div>
      <div className="row movielist-content">{renderDanhSachPhim()}</div>
    </div>
  );
}
