import elements from '../support/elements.js';
import homePage from '../pages/homePage.js';

class signInPage {

	validateSignInPage(){
		cy.url().should('contain',Cypress.env('baseUrl')+'user/login')
		cy.get(elements.signIn.usernameField).should('be.visible')
		cy.get(elements.signIn.passwordField).should('be.visible')
	}

	fillOutValidUsernameAndPassword() {
		cy.get(elements.signIn.usernameField).clear().type(Cypress.env('username'))
		cy.get(elements.signIn.passwordField).clear().type(Cypress.env('password'))
	}

	fillOutInvalidUsernameAndPassword(username,password) {
		cy.get(elements.signIn.usernameField).clear().type(username)
		cy.get(elements.signIn.passwordField).clear().type(password)
	}

	doLogin() {
		cy.get(elements.signIn.loginButton).click()
	}

	accessLoginPage() {
		cy.get(elements.signIn.loginLink).click()
	}

	validateInvalidCredentialsMessage(errorMessage){
		cy.get(elements.signIn.errorMessage).contains(errorMessage).should('be.visible')
	}

	goToRecoverPassword(){
		cy.get(elements.signIn.forgotPasswordLink).click()
	}

	fillOutInvalidUsername(email){
		cy.get(elements.signIn.usernameField).clear().type(email)
		cy.get(elements.signIn.resetPasswordButton).contains('Reset Password').click()
	}

}

export default new signInPage()