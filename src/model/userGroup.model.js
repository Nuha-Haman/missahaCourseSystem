module.exports = (sequelize, Sequelize) => {
    const userGroup = sequelize.define("userGroup", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      }
    });
  
    return userGroup;
  };