const sql = require(".").connection;
const moment = require("moment");

// constructor
const Seat = function (seat) {
  this.room_id = seat.room_id;
  this.seat_type = seat.seat_type;
  this.seat_number = seat.seat_number;
  this.seat_row = seat.seat_row;
  this.status = seat.status;
};

Seat.findById = seat_id => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM seat WHERE seat_id = ${seat_id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      if (res.length) {
        console.log("found seat: ", res[0]);
        return resolve(res[0]);
      }

      reject({ kind: "not_found" });
    });
  });
};

Seat.findByRoomId = room_id => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM seat WHERE room_id = '${room_id}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      if (res.length) {
        console.log("found seats: ", res);
        return resolve(res);
      }

      reject({ kind: "not_found" });
    });
  });
};

Seat.updateById = seat => {
  return new Promise((resolve, reject) => {
    sql.query(
      "UPDATE seat SET ? WHERE seat_id = ?",
      [seat, seat.seat_id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          return reject(err);
        }

        if (res.affectedRows == 0) {
          return reject({ kind: "not_found" });
        }

        console.log("updated seat: ", { id: seat.id, ...seat });
        resolve({ id: seat.id, ...seat });
      }
    );
  });
};

module.exports = Seat;