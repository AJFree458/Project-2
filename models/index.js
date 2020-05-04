/* eslint-disable prettier/prettier */
/* eslint-disable indent */

"use strict";
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);

const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "/../config/config.json"))[env];
const db = {};

let sequelize;

if (config.use_env_variable) {
  console.log("Using Environment Variables");
  console.log(config);
  console.log("DB_Name: " + process.env.DB_NAME);
  console.log("DB_User: " + process.env.DB_USER);
  console.log("JAWSDB_URL: " + process.env.JAWSDB_URL);

  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      dialect: "mysql",
      omitNull: true,
    }
  );
} else {
  console.log("Using Config File");
  console.log("DB_Name: " + config.database);
  console.log("DB_User: " + config.username);
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//     sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//     sequelize = new Sequelize(
//         config.database,
//         config.username,
//         config.password,
//         config
//     );
// }

// fs.readdirSync(__dirname)
//     .filter((file) => {
//         return (
//             file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//         );
//     })
//     .forEach((file) => {
//         const model = sequelize["import"](path.join(__dirname, file));
//         db[model.name] = model;
//     });

// Object.keys(db).forEach((modelName) => {
//     if (db[modelName].associate) {
//         db[modelName].associate(db);
//     }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
