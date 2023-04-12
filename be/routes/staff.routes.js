const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/staff.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/staff/search-booking/:bookingId",
    [authJwt.verifyToken, authJwt.isStaff],
    controller.StaffSearchBooking
  );

  app.delete(
    "/api/staff/booking",
    [authJwt.verifyToken, authJwt.isStaff],
    controller.StaffDeleteBooking
  );
};
