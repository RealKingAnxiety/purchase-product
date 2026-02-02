const express = require("express");
const session = require("express-session");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// SESSION SETUP
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true
}));

// LOGIN ROUTE
app.post("/login", (req, res) => {
  req.session.user = { id: 1, name: "Test User" };
  res.json({ loggedIn: true });
});

// CHECK LOGIN
app.get("/api/me", (req, res) => {
  if (req.session.user) res.json({ loggedIn: true, user: req.session.user });
  else res.json({ loggedIn: false });
});

// START SERVER
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
