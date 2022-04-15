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

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('Eli');
      cy.get('#password').type('password');
      cy.contains('login').click();

      cy.contains('Eli Davis logged in');
    });
    it('fails with wrong credentials', function () {
      cy.get('#username').type('Eli');
      cy.get('#password').type('wrongPassword');
      cy.contains('login').click();

      cy.contains('Wrong username or password');
      cy.get('.error').should('have.css', 'border-color', 'rgb(255, 0, 0)');
    });
    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({
          username: 'Eli',
          password: 'password',
        });
      });

      it('A blog can be created', function () {
        cy.contains('new blog').click();
        cy.get('#title').type('a blog created by cypress');
        cy.get('#author').type('Eli Davis');
        cy.get('#url').type('https://github.com/eli5it/Full-Stack-Open');
        cy.get('#create-button').click();
        cy.contains('succesfully created');
        cy.get('.success').should('have.css', 'border-color', 'rgb(0, 128, 0)');
      });
    });
  });
});
