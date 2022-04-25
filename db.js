var mariadb = require('mariadb');

var pool = mariadb.createPool({
    host: 'localhost',
    port: '3306',
    user: 'username',
    password: 'password',
    connectionLimit: 5,
    database: 'database'
});

// Expose a method to establish connection with MariaDB SkySQL
module.exports = Object.freeze({
    pool: pool
  });