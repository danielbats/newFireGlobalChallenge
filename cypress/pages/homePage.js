import elements from '../support/elements.js';

class homePage {

	doLogout(){
		cy.get(elements.home.myAccountLink).should('be.visible').click()
		cy.get(elements.home.logoutLink).click()
	}
	goToMyLocations(){
		cy.get(elements.home.myLocationLink).click()
	}

	validateLoggedUser(username){
		cy.get(elements.home.homeTitle).contains('Welcome '+username).should('be.visible')
	}
}

export default new homePage()