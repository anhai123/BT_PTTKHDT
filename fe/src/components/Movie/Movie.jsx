import React, { useState, useEffect, useContext } from "react";
import "./Movie.scss";
// import SpinnerLoading from "../SpinnerLoading/SpinnerLoading";
import DetailMovie from "../DetailMovie";
import filmService from "../../services/film.service";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Button,
  Space,
  message,
  DatePicker,
  Row
} from "antd";
import MoviesSection from "../ModalTrailer/MoviesSection";
import { GlobalState } from "../../GlobalState";
export default function AllMovie() {
  const [searchTerm, setSearchTerm] = useState("");
  const [danhSachPhimSearch, setDanhSachPhimSearch] = useState([]);
  const state = useContext(GlobalState);
  const [film, setfilm] =  state.filmsAPI.film;
  const [filmRender, setFilmRender] = useState([])
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
     filmService.searchFilmByName(event.target.value).then(
      (response) => {
        setFilmRender([response])
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(_content);
        message.error(_content);
      }
    );
  };
  const submit = async (e) => {
    e.preventDefault();
    await filmService.searchFilmByName(searchTerm).then(
      (response) => {
        
        message.success("Đã tìm thấy film")
        setFilmRender(response)
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(_content);
        message.error(_content);
        setFilmRender(film)
      }
    );
  }
  const renderDanhSachPhim = () => {

    return  <Row>
      {
 filmRender.map((phim, index) => {
  return <MoviesSection filmRender={[phim]} key={index}></MoviesSection>;
})
      }
    </Row>
   
  };
  if(filmRender === []) {
    setFilmRender(film)
  }
  console.log(filmRender)
  useEffect(() => {
    setFilmRender(film)
  },[film])
  return (
    <div className="container all-movie">
      <div className="search">
        <div id="wrap">
          <form autoComplete="on" onSubmit={submit}>
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
