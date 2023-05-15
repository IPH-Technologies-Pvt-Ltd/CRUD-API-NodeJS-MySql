const mysql = require("mysql");
const dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "delivery",
});

dbConn.connect((err) => {
  if (err) {
    console.log(err);
    console.log("Databsase not connected");
  } else {
    console.log("Databsase connected");
  }
});

module.exports = dbConn;
