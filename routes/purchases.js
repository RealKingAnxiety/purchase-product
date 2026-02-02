const express = require("express");
const router = express.Router();
const db = require("../db"); // your MySQL connection

router.post("/", (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: "You must be logged in to purchase" });

  const buyerId = req.session.user.id;
  const productId = Number(req.body.productId);
  const quantity = Number(req.body.quantity);

  // FRONTEND + BACKEND validation
  if (!quantity || quantity <= 0) return res.status(400).json({ error: "Quantity must be a positive number" });

  db.query("SELECT inventory FROM products WHERE id = ?", [productId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!results.length) return res.status(404).json({ error: "Product not found" });

    const available = results[0].inventory;
    if (quantity > available) return res.status(400).json({ error: "Not enough inventory" });

    db.query(
      "INSERT INTO purchases (buyer_id, product_id, quantity) VALUES (?, ?, ?)",
      [buyerId, productId, quantity],
      (err2) => {
        if (err2) return res.status(500).json({ error: "Database error inserting purchase" });

        db.query("UPDATE products SET inventory = inventory - ? WHERE id = ?", [quantity, productId], (err3) => {
          if (err3) return res.status(500).json({ error: "Database error updating inventory" });

          return res.json({ success: true });
        });
      }
    );
  });
});

module.exports = router;
