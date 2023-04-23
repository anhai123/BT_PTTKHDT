const { authJwt, validateData } = require("../middlewares");
const controller = require("../controllers/moderator.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/moderator/account",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.ModeratorAccount
  );

  app.put(
    "/api/moderator/account",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.ModeratorAccept
  );

  app.delete(
    "/api/moderator/account",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.ModeratorReject
  );

  app.get(
    "/api/moderator/search-account/:fullName",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.ModeratorSearchAccount
  );

  app.post(
    "/api/moderator/film",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.ModeratorCreateFilm
  );

  app.get(
    "/api/moderator/search-film/:title",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.ModeratorSearchFilm
  );

  app.put(
    "/api/moderator/film",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.ModeratorUpdateFilm
  );

  app.delete(
    "/api/moderator/film",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.ModeratorDeleteFilm
  );

  app.get(
    "/api/moderator/screening",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.ModeratorScreening
  );

  app.post(
    "/api/moderator/screening",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.ModeratorCreateScreening
  );

  app.get(
    "/api/film",
    [authJwt.verifyToken],
    controller.GetAllFilm
  );
};