const db = require("./db");

db.query("SELECT * FROM products", (err, results) => {
  if (err) console.error(err);
  else console.log(results);
  db.end();
});
