import React, { Fragment, useState, useEffect } from "react";
import ChooseSlot from "../components/BookingSlot/ChooseSlot/ChooseSlot";
import Checkout from "../components/BookingSlot/Checkout/Checkout";
import { Button } from "antd";
export default function BookingTicket(props) {
  console.log(props.infoDatVe);
  let [thongTinPhongVe, setThongTinPhongVe] = useState({
    danhSachGhe: [...props.infoDatVe.seats],
    room: [...props.infoDatVe.room],
    screen: { ...props.infoDatVe.screening },
  });
  let [danhSachGheDangDat, setDanhSachGheDangDat] = useState([]);
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
      <div
        className="container-fluid bg-light"
        style={{ position: "fixed", zIndex: 2, height: "100%" }}
      >
        <div
          className="bookTicket__content row mt-5"
          style={{
            position: "fixed",
            zIndex: 3,
          }}
        >
          <Button
            type="primary"
            style={{ top: "20px", zIndex: "10" }}
            onClick={props.closeModal}
          >
            Dừng mua vé
          </Button>
          <ChooseSlot
            param={props}
            thongTinPhongVe={thongTinPhongVe}
            danhSachGheDangDat={danhSachGheDangDat}
            setDanhSachGheDangDat={setDanhSachGheDangDat}
            infoDatVe={props.infoDatVe}
            setInfoDatVe={props.setInfoDatVe}
          />
          <Checkout
            param={props}
            thongTinPhongVe={thongTinPhongVe}
            danhSachGheDangDat={danhSachGheDangDat}
            infoDatVe={props.infoDatVe}
          />
        </div>
      </div>
    </Fragment>
  );
}
