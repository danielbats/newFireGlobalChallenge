/// <reference types="cypress"/>

describe("Book Store API Feature", () => {

    var userId, sessionToken, isbn1, isbn2, isbn3 = ""

    beforeEach(() => {
        //Creating a new user
        cy.createNewUser().then((resp) => {
            userId = resp.body.userID
            cy.log(userId)
            //Generating auth token
            cy.generateSessionToken().then((resp) =>{
                //Validating generated auth token
                cy.validateSessionToken(resp.token)     
                sessionToken = resp.body.token
                cy.log(sessionToken)
            })
        })  
    })

    afterEach(() => {
        //Deleting created user
        cy.deleteCreatedUser(sessionToken,userId)
    })

    it('Scenario: Create and deleteing a book list', () => {
        //Get book list to store isbn
        cy.getBooks(sessionToken).then((resp) => {
            isbn1 = resp.body.books[0].isbn
            isbn2 = resp.body.books[1].isbn
            isbn3 = resp.body.books[2].isbn
            cy.log(isbn1,isbn2,isbn3)
            //Creating a new book list with stored isbn numbers
            cy.createNewBookList(sessionToken,userId,isbn1,isbn2,isbn3).then(() => {
                //Deleting created book list
                cy.deleteBooks(sessionToken,userId)
            })
        })
    })
});