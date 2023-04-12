const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsername,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.put("/api/auth/change-password", [authJwt.verifyToken], controller.ChangePassword);

  app.put("/api/auth/forgot-password", controller.ForgotPassword);

  app.put("/api/auth/forgot-password/otp-verification", controller.ForgotPasswordOtpVerification);

  app.put("/api/auth/forgot-password/change-password", controller.ForgotPasswordChangePassword);
};
