const config = require("../config/auth.config");
const User = require("../models/user.model");
const Role = require("../models/role.model");
const email = require("../utils/email");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    let valid = 0;
    if (req.body.role_id === '1') {
      try {
        await User.getAllModeratorAccounts();
      } catch (err) {
        if (err.kind === "not_found") {
          valid = 1;
        } else {
          res.status(500).send({
            message: `Lỗi khi đăng ký!`,
          });
          return;
        }
      }
    } else if (req.body.role_id === '3') {
      valid = 1;
    }
    await User.create(new User({
      user_name: req.body.user_name,
      password: bcrypt.hashSync(req.body.password, 8),
      valid: valid,
      role_id: req.body.role_id,
      full_name: req.body.full_name,
      gender: req.body.gender,
      brithday: req.body.brithday,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
    }));
    res.send({ message: "User was registered successfully!" })
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User."
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findByUserName(req.body.user_name);
    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password,
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    if (!user.valid) {
      return res.status(401).send({
        accessToken: null,
        message: "Your account has not been accepted!",
      });
    }

    var token = jwt.sign({ id: user.user_id }, config.secret, {
      expiresIn: `1d`,
    });

    let role;
    if (user.role_id === 1) {
      role = "Ban điều hành";
    } else if (user.role_id === 2) {
      role = "Nhân viên";
    } else {
      role = "Khách hàng";
    }
    res.status(200).send({
      id: user.id,
      user_name: user.user_name,
      email: user.email,
      role: role,
      accessToken: token,
    });
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found User with username ${req.body.user_name}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving User with username " + req.body.user_name
      });
    }
  }
};

exports.ChangePassword = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    var oldPasswordMatch = bcrypt.compareSync(
      req.body.passwordOld,
      user.password,
    );

    if (!oldPasswordMatch) {
      return res.status(401).send({
        message: "Mật khẩu cũ không chính xác!",
      });
    }

    if (req.body.passwordNew != req.body.passwordNewAgain) {
      return res.status(401).send({
        message: "Mật khẩu mới không trùng khớp!",
      });
    }

    user.password = bcrypt.hashSync(req.body.passwordNew, 8);

    await User.updateById(user);

    res.status(200).send({
      message: "Đổi mật khẩu thành công!",
    });
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found User with id ${req.userId}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving User with id " + req.userId
      });
    }
  }
};

exports.ForgotPassword = async (req, res) => {
  try {
    const user = await User.findByUserName(req.body.user_name);
    if (req.body.email != user.email) {
      return res.status(401).send({
        message: "Email không chính xác!",
      });
    }
    const verificationCode = Math.floor(Math.random() * Math.pow(10, 6));
    var token = jwt.sign({ verification_code: verificationCode }, config.secret, {
      expiresIn: `10m`,
    });
    user.verification_code = token;
    try {
      await User.updateById(user);
      try {
        await email.sendEmail(user.email, "Forgot password mail", `Mã của bạn: ${verificationCode}`);

        res.status(200).send({
          message: "Hãy kiểm tra mã trong mail của bạn!",
        });
      } catch (err) {
        res.status(500).send({
          message: `Lỗi khi gửi mã qua mail ${user.email}!`
        });
      }
    } catch (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${user.user_id}!`
        });
      } else {
        res.status(500).send({
          message: `Lỗi khi cập nhật tài khoản với id ${user.user_id}!`
        });
      }
    }
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found User with username ${req.body.user_name}!`
      });
    } else {
      res.status(500).send({
        message: `Lỗi khi tìm tài khoản với tên tài khoản ${req.body.user_name}!`
      });
    }
  }
};

exports.ForgotPasswordOtpVerification = async (req, res) => {
  try {
    const user = await User.findByUserName(req.body.user_name);
    jwt.verify(user.verification_code, config.secret, async (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      if (req.body.verification_code != decoded.verification_code) {
        return res.status(401).send({
          message: "Mã OTP không trùng khớp!",
        });
      }

      const verificationCode = Math.floor(Math.random() * Math.pow(10, 6));
      
      user.verification_code = bcrypt.hashSync(verificationCode.toString(), 8);

      try {
        await User.updateById(user);
        res.status(200).send({
          message: "Mã OTP chính xác!",
          verification_code: user.verification_code,
        });
      } catch (err) {
        if (err.kind === "not_found") {
          return res.status(404).send({
            message: `Not found User with id ${user.user_id}!`
          });
        } else {
          return res.status(500).send({
            message: `Lỗi khi cập nhật tài khoản với id ${user.user_id}!`
          });
        }
      }
    });
  } catch (err) {
    if (err.kind === "not_found") {
      return res.status(404).send({
        message: `Not found User with username ${req.body.user_name}!`
      });
    } else {
      return res.status(500).send({
        message: `Lỗi khi tìm tài khoản với tên tài khoản ${req.body.user_name}!`
      });
    }
  }
};

exports.ForgotPasswordChangePassword = async (req, res) => {
  try {
    const user = await User.findByUserName(req.body.user_name);

    if (req.body.verification_code != user.verification_code) {
      return res.status(401).send({
        message: "Mã xác minh không trùng khớp!",
      });
    }

    if (req.body.passwordNew != req.body.passwordNewAgain) {
      return res.status(401).send({
        message: "Mật khẩu mới không trùng khớp!",
      });
    }
    user.verification_code = null;

    user.password = bcrypt.hashSync(req.body.passwordNew, 8);

    try {
      await User.updateById(user);

      res.status(200).send({
        message: "Đổi mật khẩu thành công!",
      });
    } catch (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${user.user_id}.`
        });
      } else {
        res.status(500).send({
          message: "Lỗi khi cập nhật tài khoản với id " + user.user_id
        });
      }
    }
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found User with id ${req.body.user_name}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving User with id " + req.body.user_name
      });
    }
  }
};