import elements from '../support/elements.js';

class myLocationsPage {

    addNewLocation(){
		cy.get(elements.home.addLocationButton).click()
        cy.get(elements.myLocation.locationNameField).clear().type('Location Testing')
        cy.get(elements.myLocation.locationLatitudeField).clear().type('12345678')
        cy.get(elements.myLocation.locationLongitudeField).clear().type('-12345678')
        cy.get(elements.myLocation.locationInformationField).clear().type('Information Testing')
        cy.get(elements.myLocation.countryDropdown).select('Brazil')
        cy.get(elements.myLocation.createLocationButton).click()
	}
    
    validateSuccessfullMessage(message){
        cy.get(elements.myLocation.successMessage).contains(message).should('be.visible')
    }
}

export default new myLocationsPage()

