import React, { Fragment, useState, useEffect } from "react";
import ChooseSlot from "../components/BookingSlot/ChooseSlot/ChooseSlot";
import Checkout from "../components/BookingSlot/Checkout/Checkout";

export default function BookingTicket(props) {
  let [thongTinPhongVe, setThongTinPhongVe] = useState({
    danhSachGhe: [
      {
        stt: 1,
        daDat: false,
        loaiGhe: "Vip",
        tenGhe: "A7",
      },
      {
        stt: 2,
        daDat: true,
        loaiGhe: "Vip",
        tenGhe: "A7",
      },
      {
        stt: 3,
        daDat: true,
        loaiGhe: "Vip",
        tenGhe: "A7",
      },
    ],
  });
  let [danhSachGheDangDat, setDanhSachGheDangDat] = useState([
    {
      stt: 1,
      giaVe: 75000,
    },
    {
      stt: 2,
      giaVe: 75000,
    },
    {
      stt: 3,
      giaVe: 75000,
    },
  ]);
  // let { maLichChieu } = props.match.params;
  // useEffect(() => {
  //   qLyPhimService
  //     .layThongTinPhongVe(maLichChieu)
  //     .then((result) => {
  //       setThongTinPhongVe(result.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.response.data);
  //     });
  // }, [maLichChieu]);
  return (
    <Fragment>
      <div className="container-fluid bg-light" style={{ paddingTop: 20 }}>
        <div className="bookTicket__content row mt-5">
          <ChooseSlot
            param={props}
            thongTinPhongVe={thongTinPhongVe}
            danhSachGheDangDat={danhSachGheDangDat}
            setDanhSachGheDangDat={setDanhSachGheDangDat}
          />
          <Checkout
            param={props}
            thongTinPhongVe={thongTinPhongVe}
            danhSachGheDangDat={danhSachGheDangDat}
          />
        </div>
      </div>
    </Fragment>
  );
}
