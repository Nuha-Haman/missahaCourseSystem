const db = require("../model");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.userGroup;

const Op = db.Sequelize.Op;

const { v4: uuidv4 } = require('uuid');
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

//sign up

exports.signup = (req, res) => {

  console.log(req.body);
    // Save User to Database
    User.create({
      userCode: uuidv4(),
      fullName:req.body.fullName,
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      address:req.body.address,
      phone1:req.body.phone1,
      phone2:req.body.phone2,
      birthdate:req.body.birthdate,
      gender:req.body.gender,
    })
      .then(user => {
        if (req.body.userGroup) {
       
           Role.findOne({
            where: {name : req.body.userGroup}
          }).then(role => {
            user.setUserGroup(role).then(() => {
              res.send({ message: "User was registered successfully!" });
            });
          });
        } 
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

//sign in
  exports.signin = (req, res) => {
    User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        let passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        let token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
  
        
        user.getUserGroup().then(role => {
         
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            role: role,
            accessToken: token
          });
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };