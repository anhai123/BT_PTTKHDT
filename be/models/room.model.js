const sql = require(".").connection;
const moment = require("moment");

// constructor
const Room = function (room) {
  this.room_name = room.room_name;
};

Room.getAll = () => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM room`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      if (res.length) {
        console.log("found rooms: ", res);
        return resolve(res);
      }

      reject({ kind: "not_found" });
    });
  });
};

Room.findByRoomId = room_id => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM room WHERE room_id = '${room_id}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      if (res.length) {
        console.log("found rooms: ", res);
        return resolve(res);
      }

      reject({ kind: "not_found" });
    });
  });
};

module.exports = Room;