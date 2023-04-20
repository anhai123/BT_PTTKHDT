const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/customer.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/customer/booking",
    [authJwt.verifyToken, authJwt.isCustomer],
    controller.CustomerBookings
  );

  app.delete(
    "/api/customer/booking",
    [authJwt.verifyToken, authJwt.isCustomer],
    controller.CustomerDeleteBookings
  );

  app.get(
    "/api/customer/search-film/:title",
    [authJwt.verifyToken, authJwt.isCustomer],
    controller.CustomerSearchFilmByTitle
  );

  app.get(
    "/api/customer/search-film/type/:type",
    [authJwt.verifyToken, authJwt.isCustomer],
    controller.CustomerSearchFilmByType
  );

  app.get(
    "/api/customer/screening/:movieId",
    [authJwt.verifyToken, authJwt.isCustomer],
    controller.CustomerGetScreeningByMovieId
  );

  app.get(
    "/api/customer/seat/:screeningId",
    [authJwt.verifyToken, authJwt.isCustomer],
    controller.CustomerGetSeatByScreeningId
  );

  app.put(
    "/api/customer/seat",
    [authJwt.verifyToken, authJwt.isCustomer],
    controller.CustomerPickSeat
  );

  app.post(
    "/api/customer/payment",
    [authJwt.verifyToken, authJwt.isCustomer],
    controller.CustomerPayment
  );

  app.put(
    "/api/customer/seat/cancel",
    [authJwt.verifyToken, authJwt.isCustomer],
    controller.CustomerSeatCancel
  );
};
