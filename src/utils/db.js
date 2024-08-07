const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const path = require("path");

// Use ".env.testing" if running tests, otherwise use ".env".
const envFile = process.env.NODE_ENV === "test" ? ".env.testing" : ".env";

// Load environment variables from the specified .env file.
dotenv.config({ path: path.resolve(__dirname, "../../", envFile) });

// Create a new Sequelize instance for connecting to the database.
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
    define: {
      timestamps: true,
      paranoid: true,
    },
  },
);

// Export module
module.exports = sequelize;
