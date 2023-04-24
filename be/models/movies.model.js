const sql = require(".").connection;
const moment = require("moment");

// constructor
const Movies = function (movies) {
  this.title = movies.title;
  this.description = movies.description;
  this.genre = movies.genre;
  this.duration = movies.duration;
  this.trailer = movies.trailer;
  this.release_date = movies.release_date;
  this.poster_ulr = movies.poster_ulr;
  this.type = movies.type;
};

Movies.create = newMovies => {
  return new Promise((resolve, reject) => {
    newMovies.release_date = moment(newMovies.release_date).format("YYYY-MM-DD");
    sql.query("INSERT INTO movies SET ?", newMovies, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      console.log("created movie: ", { id: res.insertId, ...newMovies });
      resolve({ id: res.insertId, ...newMovies });
    });
  });
};

Movies.getAll = () => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM movies`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      if (res.length) {
        for (let i = 0; i < res.length; i++) {
          res[i].release_date = moment(res[i].release_date).format("YYYY-MM-DD");
        }
        console.log("found movies: ", res);
        return resolve(res);
      }

      reject({ kind: "not_found" });
    });
  });
};

Movies.findByTitle = title => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM movies WHERE title LIKE '%${title}%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      if (res.length) {
        for (let i = 0; i < res.length; i++) {
          res[i].release_date = moment(res[i].release_date).format("YYYY-MM-DD");
        }
        console.log("found movies: ", res);
        return resolve(res);
      }

      reject({ kind: "not_found" });
    });
  });
};

Movies.findByType = type => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM movies WHERE type = '${type}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      if (res.length) {
        for (let i = 0; i < res.length; i++) {
          res[i].release_date = moment(res[i].release_date).format("YYYY-MM-DD");
        }
        console.log("found movies: ", res);
        return resolve(res);
      }

      reject({ kind: "not_found" });
    });
  });
};

Movies.updateById = movie => {
  return new Promise((resolve, reject) => {
    movie.release_date = moment(movie.release_date).format("YYYY-MM-DD");
    sql.query(
      "UPDATE movies SET ? WHERE movie_id = ?",
      [movie, movie.movie_id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          return reject(err);
        }

        if (res.affectedRows == 0) {
          // not found Movie with the movie_id
          return reject({ kind: "not_found" });
        }

        console.log("updated movie: ", { id: movie.movie_id, ...movie });
        resolve({ id: movie.movie_id, ...movie });
      }
    );
  });
};

Movies.findById = id => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM movies WHERE movie_id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      if (res.length) {
        res[0].release_date = moment(res[0].release_date).format("YYYY-MM-DD");
        resolve(res[0]);
        return;
      }

      // not found movie with the movie_id
      reject({ kind: "not_found" });
    });
  });
};

Movies.remove = id => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM movies WHERE movie_id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      if (res.affectedRows == 0) {
        // not found movie with the movie_id
        return reject({ kind: "not_found" });
      }

      console.log("deleted movie with movie_id: ", id);
      resolve(res);
    });
  });
};

module.exports = Movies;