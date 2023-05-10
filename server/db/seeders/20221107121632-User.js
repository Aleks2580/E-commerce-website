'use strict';
const bcrypt = require('bcrypt');

async function seedAdmin() {
  const hash = await bcrypt.hash('admin', 10);
  return [
    {
      login: 'admin',
      email: 'admin@e-market.com',
      password: hash,
      status: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      login: 'Stepa',
      email: 'stepa@e-market.com',
      password: hash,
      status: 'seller',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      login: 'Maksik',
      email: 'Maksik@e-market.com',
      password: hash,
      status: 'buyer',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', await seedAdmin(), {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
