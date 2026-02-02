describe("Purchase Product Flow", () => {
  it("hides purchase form when not logged in", () => {
    cy.visit("http://localhost:3000");
    cy.get("#purchase-section").should("not.be.visible");
  });

  it("shows purchase form after login", () => {
    cy.request("POST", "http://localhost:3000/login");
    cy.visit("http://localhost:3000");
    cy.get("#purchase-section").should("be.visible");
  });

  it("rejects negative quantity", () => {
    cy.request("POST", "http://localhost:3000/login");
    cy.visit("http://localhost:3000");
    cy.get("#quantity").clear().type("-5");
    cy.get("button").contains("Buy").click();
    cy.get("#error").should("contain.text", "Quantity must be a positive number");
  });

  it("rejects quantity greater than inventory", () => {
    cy.request("POST", "http://localhost:3000/login");
    cy.visit("http://localhost:3000");
    cy.get("#quantity").clear().type("999");
    cy.get("button").contains("Buy").click();
    cy.get("#error").should("contain.text", "Not enough inventory");
  });

  it("successfully purchases valid quantity", () => {
    cy.request("POST", "http://localhost:3000/login");
    cy.visit("http://localhost:3000");
    cy.get("#quantity").clear().type("1");
    cy.get("button").contains("Buy").click();
    cy.on("window:alert", (txt) => expect(txt).to.contains("Purchase successful!"));
  });
});

