const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/integration/**/*.cy.{js,jsx,ts,tsx}",  // Make sure this matches your spec file format
    baseUrl: "https://app.wingz.me",       // Optional: Define a base URL
    chromeWebSecurity: false, // ✅ Allows cross-origin navigation
  },
});
