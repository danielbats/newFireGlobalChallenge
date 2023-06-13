import myLocationsPage from "../pages/myLocationsPage.js"
import signInPage from "../pages/signInPage.js"
import homePage from "../pages/homePage.js"
import data from "../fixtures/texts.json"

beforeEach(function() {
    cy.goToWebsite()
    signInPage.accessLoginPage()
})

describe("Latlong UI Feature", () => {
    
    it("Positive Scenario: Login and logout successfully", () => {
        cy.doCompleteLogin()
        homePage.doLogout()
        signInPage.validateSignInPage()
    })

    it("Positive Scenario: Add new location", () => {
        cy.doCompleteLogin()
        homePage.validateLoggedUser(data.loggedUser)
        homePage.goToMyLocations()
        myLocationsPage.addNewLocation()
        myLocationsPage.validateSuccessfullMessage(data.successAddLocationMessage)
    })

    it("Negative Scenario: Login with invalid credentials", () => {
        signInPage.fillOutInvalidUsernameAndPassword(data.invalidUsername,data.invalidPassword)
		signInPage.doLogin()
		signInPage.validateInvalidCredentialsMessage(data.incorrectUsername)
    })
    
    it("Negative Scenario: Recover password with invalid credentials", () => {
        signInPage.goToRecoverPassword()
        signInPage.fillOutInvalidUsername(data.invalidUsername)
        signInPage.validateInvalidCredentialsMessage(data.userNotFound)
    })
})