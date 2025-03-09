describe("Profile Page Tests", () => {
  beforeEach(() => {
    cy.visit("https://auth.wingz.me/auth/signin");

    cy.get("#username").type(Cypress.env("email"));
    cy.get("#password").type(Cypress.env("password"), { log: false }); // Hide password in logs
    cy.get("button[type='submit'].btn.btn-primary.btn-block")
  .should("be.visible") // Ensure the button is visible
  .click();
  cy.wait(5000);

    
  });

  it("Should update profile details successfully", () => {

    // Handle cross-origin redirect to https://wingz.me
    cy.origin("https://app.wingz.me", () => {
      cy.url().should("include", "/book");
    });
    // Click on Account link
    cy.get(".little-menu a[href='/account']").click();
    cy.url().should("eq", "https://app.wingz.me/account");

    // Click on My Profile link
    cy.get("aside a[href='/account/profile']").click();
    cy.url().should("eq", "https://app.wingz.me/account/profile");
    // Navigate to Profile Page
    cy.get(".profile-my-profile .title h2").should("contain", "My Profile");
    
    // Update Profile Fields
    cy.get(".form-group.wz-radio-group input[value='F']").check({ force: true });
    cy.get("input[name='firstName']").clear().type("John");
    cy.get("input[name='lastName']").clear().type("Doe");
    cy.get("input[name='location']").clear().type('Manila');
    cy.get("textarea[name='bio']").clear().type('This is an automated test');

    // Save changes
    cy.get("button[type='submit'].btn.btn-primary").click();

    // Verify success message by checking the button text
    cy.get("button[type='submit']").should("contain", "Saved !");

    // Reload page and verify updated fields
    cy.reload();

    cy.get(".form-group.wz-radio-group input[value='F']").should('be.checked');
    cy.get("input[name='firstName']").should('have.value', 'John');
    cy.get("input[name='lastName']").should('have.value', 'Doe');
    cy.get("input[name='location']").should('have.value', 'Manila');
    cy.get("textarea[name='bio']").should('have.value', 'This is an automated test');
  });
});