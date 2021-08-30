module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        userCode: {
            type: Sequelize.STRING.BINARY,
            unique: true,
            allowNull: false,
          },
      fullName:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address:{
        type: Sequelize.TEXT
      },
      phone1:{
        type: Sequelize.STRING(20),
        allowNull: false,
        unique:true,
      },
      phone2:{
        type: Sequelize.STRING(20)
      },
      birthdate:{
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      gender:{
        // 0 : male , 1: female
        type: Sequelize.BOOLEAN,
        allowNull: false,                     
      }
    });
  
    return User;
  };