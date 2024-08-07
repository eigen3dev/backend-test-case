"use strict";

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = {
  async up() {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const hashPassword = await bcrypt.hash("password123", 10);

    const users = [
      {
        email: "admin@mailinator.com",
        password: hashPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await User.bulkCreate(users);
  },

  async down() {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await User.destroy({
      truncate: true,
    });
  },
};
