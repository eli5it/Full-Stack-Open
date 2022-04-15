Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(body));
    cy.visit('http://localhost:3000');
  });
});

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.contains('new blog').click();
  cy.get('#title').type(title);
  cy.get('#author').type(author);
  cy.get('#url').type(url);
  cy.get('#create-button').click();
});
