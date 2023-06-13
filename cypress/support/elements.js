
module.exports = {
    home:{
        username: '.dropdown__toggle-button',
        homeTitle: 'main > :nth-child(1)',
        myLocationLink: '.list-vertical > :nth-child(2) > a',
        addLocationButton: '.button:contains("Add new location")',
        myAccountLink: '[href="/user/"]',
        logoutLink: ':nth-child(7) > a'
    },
    signIn:{
        usernameField: "#email",
        passwordField: "#password1",
        loginButton: ".button",
        loginLink: "[href='/user/login']",
        errorMessage: '.message',
        forgotPasswordLink: '[href="forgot-password"]',
        resetPasswordButton: '.button'
    },
    myLocation: {
        locationNameField: "#locname",
        locationLatitudeField: "#loclat",
        locationLongitudeField: "#loclng",
        countryDropdown: "#country_id",
        locationInformationField: "#locinfo",
        createLocationButton: "#btnfind",
        successMessage: '.message'
    }
};