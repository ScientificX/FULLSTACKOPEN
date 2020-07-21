describe('Blog app', function() {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3001/api/test')

    cy.visit('http://localhost:3000')
     
    cy.get('#username').type('f')
    cy.get('#password').type('f')
    cy.contains('login').click()
    
  })


  it('Login form is shown', function() {
    cy.contains('Blogs')
  })


describe('user can log in', function() {
  it('logs in with correct creds', function() {
 
    cy.get('#username').type('f')
    cy.get('#password').type('f')
    cy.contains('login').click()

    cy.contains('otiger logged in')
  })

  it('fails with wrong creds', function() {
    cy.get('#username').type('oi23ger')
    cy.get('#password').type('o1ier')

    cy.contains('invalid')
  })
})
  it('user can create blogs and like and delete', function() {

    cy.get('#title').type('otiger')
    cy.get('#author').type('otiger')
    cy.get('#url').type('otiger')
    cy.get('#createblog').click()
    
    cy.get('#like-btn').click()
    cy.get('#delete-btn').click()
  })


})