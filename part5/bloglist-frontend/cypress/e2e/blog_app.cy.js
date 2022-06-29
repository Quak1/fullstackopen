describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.createUser("Tester Name", "myUser", "password");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("username").find("input").type("myUser");
      cy.contains("password").find("input").type("password");
      cy.contains("login").click();

      cy.contains("Tester Name logged in");
      cy.contains("You have logged in!").should(
        "have.css",
        "color",
        "rgb(0, 128, 0)"
      );
    });

    it("fails with wrong credentials", function () {
      cy.contains("username").find("input").type("badUser");
      cy.contains("password").find("input").type("password");
      cy.contains("login").click();

      cy.contains("Log in to application");
      cy.contains("Wrong username or password").should(
        "have.css",
        "color",
        "rgb(255, 0, 0)"
      );
    });
  });
});
