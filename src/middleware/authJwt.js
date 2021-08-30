const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../model");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        console.log(decoded);
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

// check if user is admin
isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRole().then(role => {
            if (role.name === "admin") {
                next();
                return;
            }
            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};

// check if user is trainer
isTrainer = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRole().then(role => {

            if (role.name === "trainer") {
                next();
                return;
            }
            res.status(403).send({
                message: "Require Trainer Role!"
            });
        });
    });
};


// check if user is trainer
isTrainee = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRole().then(role => {
                if (role.name === "trainee") {
                    next();
                    return;
                }
            res.status(403).send({
                message: "Require Trainee Role!"
            });
        });
    });
};


const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isTrainer: isTrainer,
    isTrainee : isTrainee
  };
  module.exports = authJwt;