module.exports = (sequelize, Sequelize) => {
    const TrainerInfo = sequelize.define("trainerInfo", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cv: {
        type: Sequelize.BLOB("long"),
      },
      qualification:{
        type: Sequelize.BLOB("long"),
      },
      experience:{
        type: Sequelize.BLOB("long"),
      },
      courses:{
        type: Sequelize.BLOB("long"),
      }
    });
  
    return TrainerInfo;
  };