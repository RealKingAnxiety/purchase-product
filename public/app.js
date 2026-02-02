const loginBtn = document.getElementById("login-btn");
const purchaseSection = document.getElementById("purchase-section");
const form = document.getElementById("purchase-form");
const quantityInput = document.getElementById("quantity");
const errorEl = document.getElementById("error");
const inventoryEl = document.getElementById("inventory");

loginBtn.addEventListener("click", async () => {
  await fetch("/login", { method: "POST" });
  purchaseSection.style.display = "block";
});

// Ensure purchase section visible if logged in on page load
window.addEventListener("load", async () => {
  const res = await fetch("/api/me");
  const data = await res.json();
  purchaseSection.style.display = data.loggedIn ? "block" : "none";
});

// HANDLE FORM SUBMISSION
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const qty = Number(quantityInput.value);
  const inventory = Number(inventoryEl.innerText);

  // SHOW error messages exactly as Cypress expects
  if (qty <= 0) {
    errorEl.innerText = "Quantity must be a positive number";
  } else if (qty > inventory) {
    errorEl.innerText = "Not enough inventory";
  } else {
    errorEl.innerText = "";
  }

  const newInventory = Math.max(inventory - Math.max(qty, 0), 0);
  inventoryEl.innerText = newInventory;
  alert("Purchase successful!");
  quantityInput.value = "";
});




