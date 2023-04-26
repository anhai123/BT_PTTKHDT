import React from "react";
import "./Checkout.scss";
import swal from "sweetalert";
import { Redirect } from "react-router-dom";
import CreditModal from "../CreditModal/CreditModal";
import userService from "../../../services/user.service";
import { message } from "antd";
export default function Checkout(props) {
  let { thongTinPhongVe, danhSachGheDangDat, param , } = props;
  console.log(thongTinPhongVe)
  const renderThongTinGheDangDat = () => {
    return danhSachGheDangDat.map((gheDangDat, index) => {
      return (
        <span key={index} className="mr-2">
          Ghế: {gheDangDat.seat_id},
        </span>
      );
    });
  };
  const renderTongTien = () => {
    return danhSachGheDangDat
      .reduce((tongTien, gheDangDat, index) => {
        if(gheDangDat.seat_type === "Ghế thường") {
          return tongTien += 75000;
        }
        else return tongTien += 90000
      }, 0)
      .toLocaleString();
  };
  // seat_ids, prices, amount, screening_id
  const datVe = async () => {
     var seats_id = [];
     danhSachGheDangDat.map((gheDangDat, index) => {
      return (      
        seats_id.push(gheDangDat.seat_id) 
      );
    });
     var prices = [];
     danhSachGheDangDat.map((gheDangDat) => {
      gheDangDat.seat_type === "Ghế thường" ? prices.push("75000") : prices.push("90000")
     })
     var amount = danhSachGheDangDat
     .reduce((tongTien, gheDangDat, index) => {
       if(gheDangDat.seat_type === "Ghế thường") {
         return tongTien += 75000;
       }
       else return tongTien += 90000
     }, 0)
     var screening_id = thongTinPhongVe.screen.screening_id
     console.log(prices)
    await userService.paymentFilm(seats_id,prices, amount,screening_id).then(
      (response) => {
        message.success("Đặt vé thành công");
        window.location.href = "/home";
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
  return (
    <div className="checkOut__right col-md-3 col-sm-12">
      <div className="checkout__form">
        <div className="total__price">
          <span className="price">₫{renderTongTien()}</span>
        </div>
        <div className="film__info">
          <span className="film__age--C">
            {thongTinPhongVe.room[0]?.room_name}
          </span>
          
        </div>
        <div className="count__slot">
          <div>Ghế đã chọn: </div>
          <div className="slot">{renderThongTinGheDangDat()}</div>
         
        </div>


      </div>
      <div className="textNotification text-center">
        <i className="fa fa-info-circle text-danger mr-1" />
        <span className="noti__text">
          Vé đã mua không thể đổi hoặc hoàn tiền Mã vé sẽ được gửi qua tin nhắn{" "}
          <span className="noti__link">ZMS</span> (tin nhắn Zalo) và{" "}
          <span className="noti__link">Email</span> đã nhập.{" "}
        </span>
      </div>
      <div
        id="btnBook"
        className="btnBook"
        data-toggle="modal"
        data-target="#CreditModal"
        // onClick={() => {
        //   datVe();
        // }}
      >
        Thanh toán
      </div>
      <CreditModal datVe={datVe} />
    </div>
  );
}
