const Booking = require("../models/booking.model");
const Movies = require("../models/movies.model");
const Payment = require("../models/payment.model");
const Room = require("../models/room.model");
const Screening = require("../models/screening.model");
const Seat = require("../models/seat.model");

exports.CustomerBookings = async (req, res) => {
  try {
    const bookings = await Booking.findByUserId(req.userId);
    res.status(200).send(bookings);
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Không tìm thấy vé với user_id ${req.userId}!`,
      });
      return;
    } else {
      res.status(500).send({
        message: `Lỗi khi tìm vé!`,
      });
      return;
    }
  }
};

exports.CustomerDeleteBookings = async (req, res) => {
  for (let id of req.body.ids) {
    try {
      await Booking.remove(id);
    } catch (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found with booking_id ${id}!`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete with booking_id " + id,
        });
      }
      return;
    }
  }
  res.send({ message: `Bookings was deleted successfully!` });
};

exports.CustomerSearchFilmByTitle = async (req, res) => {
  try {
    const movies = await Movies.findByTitle(req.params.title);
    res.status(200).send(movies);
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Không tìm thấy phim với tên ${req.params.title}!`,
      });
      return;
    } else {
      res.status(500).send({
        message: `Lỗi khi tìm phim`,
      });
      return;
    }
  }
};

exports.CustomerSearchFilmByType = async (req, res) => {
  try {
    const movies = await Movies.findByType(req.params.type);
    res.status(200).send(movies);
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Không tìm thấy phim với type ${req.params.type}!`,
      });
      return;
    } else {
      res.status(500).send({
        message: `Lỗi khi tìm phim`,
      });
      return;
    }
  }
};

exports.CustomerGetScreeningByMovieId = async (req, res) => {
  try {
    const screenings = await Screening.findByMovieId(req.params.movieId);
    res.status(200).send(screenings);
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Không tìm thấy khung giờ với movie_id ${req.params.movieId}!`,
      });
      return;
    } else {
      res.status(500).send({
        message: `Lỗi khi tìm khung giờ`,
      });
      return;
    }
  }
};

exports.CustomerGetSeatByScreeningId = async (req, res) => {
  try {
    const screening = await Screening.findByScreeningId(req.params.screeningId);
    try {
      const room = await Room.findByRoomId(screening.room_id);
      try {
        const seats = await Seat.findByRoomId(screening.room_id);
        res.status(200).send({
          screening: screening,
          room: room,
          seats: seats,
        });
      } catch (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Không tìm thấy ghế với room_id ${screening.room_id}!`,
          });
          return;
        } else {
          res.status(500).send({
            message: `Lỗi khi tìm ghế!`,
          });
          return;
        }
      }
    } catch (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Không tìm thấy phòng với room_id ${screening.room_id}!`,
        });
        return;
      } else {
        res.status(500).send({
          message: `Lỗi khi tìm phòng!`,
        });
        return;
      }
    }
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Không tìm thấy khung giờ với screening_id ${req.params.screeningId}!`,
      });
      return;
    } else {
      res.status(500).send({
        message: `Lỗi khi tìm khung giờ!`,
      });
      return;
    }
  }
};

exports.CustomerPickSeat = async (req, res) => {
  try {
    const seat = await Seat.findById(req.body.seat_id);
    if (seat.status === `Chưa đặt`) {
      await Seat.updateById({
        seat_id: req.body.seat_id,
        status: `Đang đặt`,
      });
      res.send({
        message: "Seat was updated successfully!",
      });
    } else {
      try {
        const seats = await Seat.findByRoomId(req.body.room_id);
        res.status(400).send({
          message: "Ghế đã bị người khác chọn!",
          seats: seats,
        });
      } catch (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Seat with room_id ${req.body.room_id}.`,
          });
          return;
        } else {
          res.status(500).send({
            message: "Error retrieving Seat with room_id " + req.body.room_id,
          });
          return;
        }
      }
    }
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Seat with id ${req.body.seat_id}.`,
      });
      return;
    } else {
      res.status(500).send({
        message: "Error retrieving Seat with id " + req.body.seat_id,
      });
      return;
    }
  }
};

exports.CustomerPayment = async (req, res) => {
  try {
    let now = new Date;
    let payment = new Payment(req.body);
    payment.payment_date = now;
    const newPayment = await Payment.create(payment);
    let booking = new Booking(req.body);
    booking.user_id = req.userId;
    booking.payment_id = newPayment.id;
    booking.booking_date = now;
    for (let i = 0; i < req.body.seat_ids.length; i++) {
      booking.seat_id = req.body.seat_ids[i];
      booking.price = req.body.prices[i];
      const newBooking = await Booking.create(booking);
    }
    res.send({ message: "Thanh toán thành công!" });
  } catch (err) {
    res.status(500).send({
      message:
        `Lỗi khi thanh toán!`
    });
  }
};