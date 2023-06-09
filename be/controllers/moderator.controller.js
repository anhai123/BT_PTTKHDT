const Movies = require("../models/movies.model.js");
const Room = require("../models/room.model.js");
const Screening = require("../models/screening.model.js");
const User = require("../models/user.model.js");

exports.ModeratorAccount = async (req, res) => {
  try {
    const users = await User.getAllStaffAccountsByValid(0);
    res.status(200).send(users);
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Không có tài khoản cần xử lý.`,
      });
      return;
    } else {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
      return;
    }
  }
};

exports.ModeratorAccept = async (req, res) => {
  for (let id of req.body.ids) {
    try {
      const user = await User.findById(id);
      user.valid = 1;
      await User.updateById(user);
    } catch (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${id}.`,
        });
        return;
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + id,
        });
        return;
      }
    }
  }
  res.send({
    message: "Users was updated successfully.",
  });
};

exports.ModeratorReject = async (req, res) => {
  for (let id of req.body.ids) {
    try {
      await User.remove(id);
    } catch (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found with user_id ${id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete with user_id " + id,
        });
      }
      return;
    }
  }
  res.send({ message: `Users was deleted successfully!` });
};

exports.ModeratorSearchAccount = async (req, res) => {
  try {
    const users = await User.findByNameAndRoleId(2);
    res.status(200).send(users);
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Không tìm thấy tài khoản với tên !`,
      });
      return;
    } else {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users!",
      });
      return;
    }
  }
};

exports.ModeratorCreateFilm = async (req, res) => {
  try {
    await Movies.create(new Movies({
      title: req.body.title,
      description: req.body.description,
      genre: req.body.genre,
      duration: req.body.duration,
      trailer: req.body.trailer,
      release_date: req.body.release_date,
      poster_ulr: req.body.poster_ulr,
      type: req.body.type,
    }));
    res.send({ message: "Thêm phim mới thành công!" })
  } catch (err) {
    res.status(500).send({
      message:
        `Lỗi khi thêm phim`
    });
  }
};

exports.ModeratorSearchFilm = async (req, res) => {
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

exports.ModeratorUpdateFilm = async (req, res) => {
  try {
    await Movies.updateById({
      movie_id: req.body.movie_id,
      title: req.body.title,
      description: req.body.description,
      genre: req.body.genre,
      duration: req.body.duration,
      trailer: req.body.trailer,
      release_date: req.body.release_date,
      poster_ulr: req.body.poster_ulr,
    });
    res.send({ message: "Cập nhật phim thành công!" })
  } catch (err) {
    res.status(500).send({
      message: `Lỗi khi cập nhật phim!`
    });
  }
};

exports.ModeratorDeleteFilm = async (req, res) => {
  for (let id of req.body.ids) {
    try {
      await Screening.removeByMovieId(id);
    } catch (err) {
      if (err.kind !== "not_found") {
        res.status(500).send({
          message: "Could not delete with movie_id " + id,
        });
        return;
      }
    }
    try {
      await Movies.remove(id);
    } catch (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found with movie_id ${id}!`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete with movie_id " + id,
        });
      }
      return;
    }
  }
  res.send({ message: `Movies was deleted successfully!` });
};

exports.ModeratorScreening = async (req, res) => {
  try {
    const rooms = await Room.getAll();
    const movies = await Movies.getAll();
    res.status(200).send({
      rooms: rooms,
      movies: movies,
    });
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Không tìm thấy phim hoặc phòng!`,
      });
      return;
    } else {
      res.status(500).send({
        message: `Lỗi khi tìm phim hoặc phòng!`,
      });
      return;
    }
  }
};

exports.ModeratorCreateScreening = async (req, res) => {
  try {
    let screening = new Screening(req.body);
    const movie = await Movies.findById(req.body.movie_id);
    let start_time = new Date(screening.start_time);
    screening.end_time = start_time;
    screening.end_time.setMinutes(start_time.getMinutes() + movie.duration);
    await Screening.create(screening);
    res.send({ message: "Thêm lịch chiếu thành công!" });
  } catch (err) {
    res.status(500).send({
      message:
        `Lỗi khi thêm lịch chiếu!`
    });
  }
};

exports.GetAllFilm = async (req, res) => {
  try {
    const movies = await Movies.getAll();
    res.status(200).send(movies);
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Không tìm thấy phim!`,
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

exports.GetInformation = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).send(user);
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Không tìm thấy tài khoản với id ${req.userId}!`,
      });
      return;
    } else {
      res.status(500).send({
        message: `Lỗi khi tìm tài khoản với id ${req.userId}!`,
      });
      return;
    }
  }
};

exports.UpdateInformation = async (req, res) => {
  try {
    req.body.user_id = req.userId;
    await User.updateById(req.body);
    res.status(200).send({
      message: "Cập nhật thông tin thành công!",
    });
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found User with id ${req.userId}.`
      });
    } else {
      res.status(500).send({
        message: "Lỗi khi cập nhật tài khoản với id " + req.userId
      });
    }
  }
};