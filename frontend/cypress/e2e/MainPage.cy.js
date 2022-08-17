/// <reference types="cypress" />

describe("로그인한 사용자 동작", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    Cypress.Cookies.debug(true);
    cy.clearCookies();
    cy.setCookie("accessToken", "mockAccessToken");

    cy.intercept("GET", "/api/v1/members/me", {
      body: {
        id: 123,
        username: "승팡",
        email: "email@email.com",
      },
    }).as("getMe");

    cy.reload();
  });

  it("방문하기", () => {
    cy.wait("@getMe");
  });
});
