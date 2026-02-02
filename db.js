const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "appuser",         // <- the new user
  password: "password123", // <- the password we just set
  database: "purchase_product" // <- make sure this DB exists
});

db.connect(err => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

module.exports = db;
