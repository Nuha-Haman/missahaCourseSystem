const { authJwt , upload } = require("../middleware");

const userController = require("../controller/user.controller");
const trainerController = require("../controller/trainerInfo.controller");

module.exports = function(router) {
  router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //----------------------------User Routes Section------------------------------//
  //get All users
  router.get("/user/all",userController.findAllUsers);

  //get One users
  router.get("/user/:id",userController.findOneUser);

  // update user data
  router.patch("/user/:id",userController.updateUser);

  //delete user
  router.delete("/user/:id",userController.deleteUser);

  //----------------------------User Group Routes Section------------------------------//
  //get All users
  router.get("/userGroup/all",userController.findAllUserGroup);

  //create new user group
  router.post("/userGroup/create",userController.createUserGroup);

  // update user data
  router.patch("/userGroup/:id",userController.updateUserGroup);

  //delete user
  router.delete("/userGroup/:id",userController.deleteUserGroup);


  //-----------------------------Trainer Info Routes Section -------------------------------//
  //Insert Trainer Information to database
  router.post('/user/trainerInfo',upload.single('cv'),trainerController.createTrainer);
  
  // update Trainer data
  router.patch("/user/trainerInfo/:userId",upload.single('cv'),trainerController.updateTrainer);

  //Get All Trainers
  router.get("/trainer",trainerController.findAllTrainers);

  //Get single Trainer
  router.get("/trainer/:userId",trainerController.findTrainer);
  
  //delete Trainer
  router.delete("/user/trainerInfo/:userId",trainerController.deleteTrainer);

  //------------------------------------------------------------------------------------------------//
  // Routes for users Board
  // router.get("/api/user/all", userController.allAccess);

  // router.get("/api/test/trainer",[authJwt.verifyToken, authJwt.isTrainer],userController.userBoard);

  // router.get("/api/test/trainee",[authJwt.verifyToken, authJwt.isTrainee],userController.adminBoard);

  // router.get("/api/test/admin",[authJwt.verifyToken, authJwt.isAdmin],userController.adminBoard);
};

