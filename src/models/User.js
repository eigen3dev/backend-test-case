const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

/**
 * Defines the User model.
 *
 * @typedef {Object} User
 * @property {string} email - The email address of the user. Must be unique and non-null.
 * @property {string} password - The password of the user. Cannot be null.
 * @property {Date} createdAt - The date and time when the user record was created.
 * @property {Date} updatedAt - The date and time when the user record was last updated.
 * @property {Date|null} deletedAt - The date and time when the user record was deleted. Null if not deleted.
 *
 * @type {Model}
 */
const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    timestamps: true,
  },
);

module.exports = User;
