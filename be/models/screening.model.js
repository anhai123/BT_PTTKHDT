const sql = require(".").connection;

// constructor
const Screening = function (screening) {
  this.room_id = screening.room_id;
  this.movie_id = screening.movie_id;
  this.start_time = screening.start_time;
  this.end_time = screening.end_time;
};

Screening.create = newScreening => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO screening SET ?", newScreening, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      console.log("created screening: ", { id: res.insertId, ...newScreening });
      resolve({ id: res.insertId, ...newScreening });
    });
  });
};

Screening.findByScreeningId = screening_id => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM screening WHERE screening_id = ${screening_id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      if (res.length) {
        console.log("found screening: ", res[0]);
        return resolve(res[0]);
      }

      reject({ kind: "not_found" });
    });
  });
};

Screening.findByMovieId = movie_id => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM screening WHERE movie_id = '${movie_id}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      if (res.length) {
        console.log("found screenings: ", res);
        return resolve(res);
      }

      reject({ kind: "not_found" });
    });
  });
};

Screening.removeByMovieId = movie_id => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM screening WHERE movie_id = ?", movie_id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      if (res.affectedRows == 0) {
        return reject({ kind: "not_found" });
      }

      console.log("deleted screenings with movie_id: ", movie_id);
      resolve(res);
    });
  });
};

module.exports = Screening;