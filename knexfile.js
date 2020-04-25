const dotenv = require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};