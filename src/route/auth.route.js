const { verifySignUp } = require("../middleware");
const controller = require("../controller/auth.controller");

module.exports = function(app) {
    // header token config
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    // sign up route
    app.post("/api/auth/signup",[verifySignUp.checkDuplicate],controller.signup);
  
    //log in  route
    app.post("/api/auth/signin", controller.signin);
  };