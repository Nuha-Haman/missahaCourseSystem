const fs = require("fs");
const db = require("../model");
const TrainerInfo = db.trainerInfo;

const createTrainer = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    TrainerInfo.create({
      qualification:req.body.qualification,
      experience: req.body.experience,
      courses:req.body.courses,
      userId:req.body.userId,
      cv: fs.readFileSync(
        "uploads/cv/" + req.file.filename
      ),
    }).then((cv) => {
      fs.writeFileSync("uploads/cv/" + req.file.filename,cv.toString());
      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload cvs: ${error}`);
  }
};

// Update Trainer Data
const updateTrainer = (req, res) => {
  const id = req.params.userId;

  if (req.file == undefined) {
    return res.send(`You must select a file.`);
  }

  TrainerInfo.update({
      qualification:req.body.qualification,
      experience: req.body.experience,
      courses:req.body.courses,
      userId:req.body.userId,
      cv: fs.readFileSync(
        "uploads/cv/" + req.file.filename
      ),
    },
    {where: { userId: id }}
    )
    .then(cv => {
      fs.writeFileSync("uploads/cv/" + req.file.filename,cv.toString());
    })
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

// Delete Trainer Controller 
const deleteTrainer = (req, res) => {
  const id = req.params.userId;

  TrainerInfo.destroy({where: { userId: id }})
    .then(num => {
      if (num == 1) {
        res.send({message: "Trainer Data was deleted successfully!"});
      } else {
        res.status(404).send({message: `Cannot delete Trainer with user id=${id}. Maybe User was not found!`});
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete Trainer with id=" + id});
    });
};

// Find all trainer  
const findAllTrainers = (req, res) => {
 TrainerInfo.findAll()
  .then(data => {res.send(data);})
  .catch(err => {
    res.status(500).send({message:err.message || "Some error occurred while retrieving userGroups."});
  });
};

// Find all trainer  
const findTrainer = (req, res) => {
  const id = req.params.userId;

  TrainerInfo.findOne({ attributes: ['id', 'courses' , 'experience' , 'qualification'] ,  where: {userId: id}})
   .then(data => {res.send(data);})
   .catch(err => {
     res.status(500).send({message:err.message || "Some error occurred while retrieving userGroups."});
   });
 };

module.exports = {
  createTrainer,
  deleteTrainer,
  updateTrainer,
  findAllTrainers,
  findTrainer
};