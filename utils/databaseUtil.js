const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "Localhost",
  user: "root",
  password: "heheharsh",
  database: "airbnb",
});

module.exports = pool.promise();
