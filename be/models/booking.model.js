const sql = require(".").connection;
const moment = require("moment");

// constructor
const Booking = function (booking) {
  this.user_id = booking.user_id;
  this.screening_id = booking.screening_id;
  this.seat_id = booking.seat_id;
  this.payment_id = booking.payment_id;
  this.booking_date = booking.booking_date;
  this.price = booking.price;
};

Booking.create = newBooking => {
  return new Promise((resolve, reject) => {
    newBooking.booking_date = moment(newBooking.booking_date).format("YYYY-MM-DD hh:mm:ss");
    sql.query("INSERT INTO booking SET ?", newBooking, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      console.log("created booking: ", { id: res.insertId, ...newBooking });
      resolve({ id: res.insertId, ...newBooking });
    });
  });
};

Booking.findById = id => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM booking WHERE booking_id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      if (res.length) {
        res[0].booking_date = moment(res[0].booking_date).format("YYYY-MM-DD hh:mm:ss");
        resolve(res[0]);
        return;
      }

      // not found booking with the booking_id
      reject({ kind: "not_found" });
    });
  });
};

Booking.findByUserId = user_id => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM booking WHERE user_id = ${user_id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      if (res.length) {
        for(let i = 0; i < res.length; i++) {
          res[i].booking_date = moment(res[i].booking_date).format("YYYY-MM-DD hh:mm:ss");
        }
        resolve(res);
        return;
      }

      reject({ kind: "not_found" });
    });
  });
};

Booking.remove = id => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM booking WHERE booking_id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      if (res.affectedRows == 0) {
        // not found booking with the booking_id
        return reject({ kind: "not_found" });
      }

      console.log("deleted booking with booking_id: ", id);
      resolve(res);
    });
  });
};

module.exports = Booking;