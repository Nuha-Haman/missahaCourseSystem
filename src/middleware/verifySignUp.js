const db = require("../model");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicate = (req, res, next) => {
    // Username
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Username is already in use!"
        });
        return;
      }
  
      // Email
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: "Failed! Email is already in use!"
          });
          return;
        }

         // Phone
      User.findOne({
        where: {
          phone1: req.body.phone1
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: "Failed! Phone is already in use!"
          });
          return;
        }

        next();
      });
    });
    });
  };




  const verifySignUp = {
    checkDuplicate: checkDuplicate,
  };
  

  module.exports = verifySignUp;