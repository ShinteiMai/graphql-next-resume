describe("Index page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be able to render the counter component", () => {
    cy.get("[data-testid=counter]");
    cy.get("[data-testid=increment-button]");
    cy.get("[data-testid=decrement-button]");

    cy.get("[data-testid=count]").invoke("text").should("eq", "0");
  });

  it("should be able to increment the counter", () => {
    cy.get("[data-testid=count]").invoke("text").should("eq", "0");

    cy.get("[data-testid=increment-button]").click();
    cy.get("[data-testid=count]").invoke("text").should("eq", "1");

    cy.get("[data-testid=increment-button]").click();
    cy.get("[data-testid=count]").invoke("text").should("eq", "2");
  });

  it("should be able to decrement the counter", () => {
    cy.get("[data-testid=count]").invoke("text").should("eq", "0");

    cy.get("[data-testid=decrement-button]").click();
    cy.get("[data-testid=count]").invoke("text").should("eq", "-1");

    cy.get("[data-testid=decrement-button]").click();
    cy.get("[data-testid=count]").invoke("text").should("eq", "-2");
  });
});
