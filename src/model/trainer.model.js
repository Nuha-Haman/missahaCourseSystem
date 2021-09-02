module.exports = (sequelize, Sequelize) => {
    const TrainerInfo = sequelize.define("trainerInfo", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      qualification:{
        type: Sequelize.TEXT,
      },
      experience:{
        type: Sequelize.TEXT,
      },
      courses:{
        type: Sequelize.TEXT,
      },
      cv: {
        type: Sequelize.BLOB("long"),
      }
    });
  
    return TrainerInfo;
  };