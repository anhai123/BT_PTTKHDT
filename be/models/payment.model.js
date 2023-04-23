const sql = require(".").connection;
const moment = require("moment");

// constructor
const Payment = function (payment) {
  this.payment_date = payment.payment_date;
  this.amount = payment.amount;
};

Payment.create = newPayment => {
  return new Promise((resolve, reject) => {
    newPayment.payment_date = moment(newPayment.payment_date).format("YYYY-MM-DD hh:mm:ss");
    sql.query("INSERT INTO payment SET ?", newPayment, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      console.log("created payment: ", { id: res.insertId, ...newPayment });
      resolve({ id: res.insertId, ...newPayment });
    });
  });
};

module.exports = Payment;