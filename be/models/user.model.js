const sql = require("./").connection;

// constructor
const User = function (user) {
  this.user_name = user.user_name;
  this.password = user.password;
  this.valid = user.valid;
  this.role_id = user.role_id;
  this.full_name = user.full_name;
  this.gender = user.gender;
  this.brithday = user.brithday;
  this.address = user.address;
  this.email = user.email;
  this.phone = user.phone;
  this.verification_code = user.verification_code;
};

User.create = newUser => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      console.log("created user: ", { id: res.insertId, ...newUser });
      resolve({ id: res.insertId, ...newUser });
    });
  });
};

User.getAllModeratorAccounts = () => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM user WHERE role_id = 1`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      if (res.length) {
        for (let i = 0; i < res.length; i++) {
          res[i].brithday = moment(res[i].brithday).format("YYYY-MM-DD");
        }
        console.log("found users: ", res);
        return resolve(res);
      }

      reject({ kind: "not_found" });
    });
  });
};

User.getAllStaffAccountsByValid = valid => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM user WHERE valid = ${valid} and role_id = 2`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      if (res.length) {
        for (let i = 0; i < res.length; i++) {
          res[i].brithday = moment(res[i].brithday).format("YYYY-MM-DD");
        }
        console.log("found users: ", res);
        return resolve(res);
      }

      // not found Users with the valid
      reject({ kind: "not_found" });
    });
  });
};

User.findByUserName = user_name => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM user WHERE user_name = '${user_name}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      if (res.length) {
        res[0].brithday = moment(res[0].brithday).format("YYYY-MM-DD");
        console.log("found user: ", res[0]);
        return resolve(res[0]);
      }

      // not found User with the id
      reject({ kind: "not_found" });
    });
  });
};

User.findById = id => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM user WHERE user_id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      if (res.length) {
        res[0].brithday = moment(res[0].brithday).format("YYYY-MM-DD");
        resolve(res[0]);
        return;
      }

      // not found User with the id
      reject({ kind: "not_found" });
    });
  });
};

User.updateById = user => {
  return new Promise((resolve, reject) => {
    sql.query(
      "UPDATE user SET ? WHERE user_id = ?",
      [user, user.user_id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          return reject(err);
        }

        if (res.affectedRows == 0) {
          // not found User with the id
          return reject({ kind: "not_found" });
        }

        console.log("updated user: ", { id: user.id, ...user });
        resolve({ id: user.id, ...user });
      }
    );
  });
};

User.remove = id => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM user WHERE user_id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      if (res.affectedRows == 0) {
        // not found User with the user_id
        return reject({ kind: "not_found" });
      }

      console.log("deleted user with user_id: ", id);
      resolve(res);
    });
  });
};

User.findByNameAndRoleId = (full_name, role_id) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM user WHERE role_id = ${role_id} and full_name LIKE '%${full_name}%' and valid = 1`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      if (res.length) {
        for (let i = 0; i < res.length; i++) {
          res[i].brithday = moment(res[i].brithday).format("YYYY-MM-DD");
        }
        console.log("found users: ", res);
        return resolve(res);
      }

      // not found User with the full_name and role_id
      reject({ kind: "not_found" });
    });
  });
};

module.exports = User;