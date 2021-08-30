const { authJwt } = require("../middleware");
const controller = require("../controller/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user/all", controller.allAccess);

  app.get("/api/test/trainer",[authJwt.verifyToken, authJwt.isTrainer],controller.userBoard);

  app.get("/api/test/trainee",[authJwt.verifyToken, authJwt.isTrainee],controller.adminBoard);

  app.get("/api/test/admin",[authJwt.verifyToken, authJwt.isAdmin],controller.adminBoard);
};