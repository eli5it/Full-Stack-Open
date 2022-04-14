describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.visit('http://localhost:3000');

    const user = {
      name: 'Eli Davis',
      username: 'Eli',
      password: 'password',
    };

    cy.request('POST', 'http://localhost:3003/api/users', user);
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
  });
});
