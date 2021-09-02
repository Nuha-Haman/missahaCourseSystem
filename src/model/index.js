const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,
    logging: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../model/user.model.js")(sequelize, Sequelize);
db.userGroup = require("../model/userGroup.model.js")(sequelize, Sequelize);
db.trainerInfo = require("../model/trainer.model.js")(sequelize, Sequelize);

// User and UserGroup Table Relation
db.userGroup.hasMany(db.user, {as: "users"  });
db.user.belongsTo(db.userGroup, {
    foreignKey: "userGroupId",
    as: "userGroup"
});

// User and TrinerInfo Table Relation
// db.user.hasOne( db.trainerInfo, {as: "trainerInfo"});
db.trainerInfo.belongsTo(db.user, { 
  foreignKey: 'userId', 
  as: 'trinerInfo', 
  onDelete: 'CASCADE'
});

db.ROLES = ["admin", "registrar","trainee", "trainer"];

module.exports = db;
