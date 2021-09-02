const db = require("../model");
const config = require("../config/auth.config");
const User = db.user;
const UserGroup = db.userGroup;

// ---------------- Users Operation -----------//
// Retrieve all Users from the database.
exports.findAllUsers = (req, res) => {
   User.findAll({ include: {model:   UserGroup, as:"userGroup"} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

// fetch one user data
exports.findOneUser = (req, res) => {
  const id = req.params.id;
  User.findByPk(id,{ include: {model:   UserGroup, as:"userGroup"} })
    .then(data => {res.send(data)})
    .catch(err => {
      res.status(500).send({message: "Error retrieving User with id=" + id});
    });
};

// update a user data
exports.updateUser = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {where: { id: id }})
    .then(num => {
      if (num == 1) {
        res.send({message: "User was updated successfully."});
      } else {
        res.status(404).send({message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`});
      }
    })
    .catch(err => {
      res.status(500).send({message: "Error updating User with id=" + id});
    });
};

//delete a user from the database.
exports.deleteUser = (req, res) => {
  const id = req.params.id;

  User.destroy({where: { id: id }})
    .then(num => {
      if (num == 1) {
        res.send({message: "user was deleted successfully!"});
      } else {
        res.status(404).send({message: `Cannot delete User with id=${id}. Maybe User was not found!`});
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete User with id=" + id});
    });
};

// ---------------- UserGroups Operation -----------//
//retrive all usergroups
exports.findAllUserGroup = (req, res) => {
  UserGroup.findAll()
    .then(data => {res.send(data);})
    .catch(err => {
      res.status(500).send({message:err.message || "Some error occurred while retrieving userGroups."});
    });
};

//create new user group
exports.createUserGroup = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!"});
    return;
  }

  // Save userGroup in the database
  UserGroup.create({name: req.body.name,})
    .then(data => {res.send(data);})
    .catch(err => {
      res.status(500).send({message: err.message || "Some error occurred while creating the userGroup."});
    });
};

//update user group 
exports.updateUserGroup = (req, res) => {
  const id = req.params.id;
  UserGroup.update(req.body, {where: { id: id }})
    .then(num => {
      if (num == 1) {
        res.send({message: "UserGroup was updated successfully."});
      } else {
        res.send({message: `Cannot update UserGroup with id=${id}. Maybe UserGroup was not found or req.body is empty!`});
      }
    })
    .catch(err => {res.status(500).send({message: "Error updating UserGroup with id=" + id});
    });
};

//delete user group
exports.deleteUserGroup = (req, res) => {
  const id = req.params.id;
  UserGroup.destroy({where: { id: id }})
    .then(num => {
      if (num == 1) {
        res.send({message: "UserGroup was deleted successfully!"});
      } else {
        res.send({message: `Cannot delete UserGroup with id=${id}. Maybe UserGroup was not found!`});
      }
    })
    .catch(err => {
      res.status(500).send({message: "Could not delete UserGroup with id=" + id});
    });
};














exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
