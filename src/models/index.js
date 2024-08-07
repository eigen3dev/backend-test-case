"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

// Initializes the Sequelize instance.
let sequelize;
if (config.use_env_variable) {
  // Use environment variable for database connection if specified.
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Use database credentials from config file.
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

// Reads the current directory and imports all models.
fs.readdirSync(__dirname)
  .filter((file) => {
    // Filter out the current file and non-JavaScript files.
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    // Import each model and add it to the db object.
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name] = model;
  });

// Sets up associations between models if applicable.
Object.keys(db).forEach((modelName) => {
  // Call the associate method to set up relationships between models.
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Add the Sequelize instance and Sequelize library to the db object.
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export the db object containing all models and Sequelize instances.
module.exports = db;
