import './commands'

import '@testing-library/cypress/add-commands';
import elements from "../support/elements.js";
import data from "../fixtures/apiConst.json"
import body from "../fixtures/apiBody.json"

Cypress.Commands.add("goToWebsite", () => {
	cy.visit(Cypress.env('baseUrl'))
})

Cypress.Commands.add("doCompleteLogin", () => {
	cy.get(elements.signIn.usernameField).clear().type(Cypress.env('username'))
	cy.get(elements.signIn.passwordField).clear().type(Cypress.env('password'))
	cy.get(elements.signIn.loginButton).click()
})

Cypress.Commands.add("generateSessionToken", () => {
	cy.request({
		method: 'POST',
		url: Cypress.env("accountAPIUrl") + data.generateToken,
		headers: {
			'Content-Type' : 'application/json',
			'accept' : 'application/json'
		},
		body: body.createNewUser,
		failOnStatusCode: false
	}).should((response) => {
		return response.body;
	});
})

Cypress.Commands.add("validateSessionToken", (token) => {
	cy.request({
		method: 'POST',
		url: Cypress.env("accountAPIUrl") + data.authorized,
		headers: {
			'Content-Type' : 'application/json',
			'accept' : 'application/json',
			'Authorization': 'Bearer ' + token
		},
		body: body.createNewUser,
		failOnStatusCode: false
	}).should((response) => {
		expect(response.body).to.eq(true)
		return response.body;
	});
})

Cypress.Commands.add("createNewUser", () => {
	cy.fixture('apiBody').then((bodyRequest) => {
		cy.request({
			method: 'POST',
			url: Cypress.env("accountAPIUrl") + data.user,
			headers: {
				'Content-Type' : 'application/json',
				'accept' : 'application/json'
			},
			body: bodyRequest.createNewUser,
			failOnStatusCode: false
		}).should((response) => {
			expect(response.status).to.eq(201)
			return response.body;
		});
	})
})

Cypress.Commands.add("getCreatedUser", (userId) => {
	cy.request({
		method: 'GET',
		url: Cypress.env("accountAPIUrl") + data.user + userId,
		body: body.empty
	}).should((response) => {
		expect(response.status).to.eq(200)
		return response.body;
	});
})

Cypress.Commands.add("deleteCreatedUser", (token,userId) => {
	cy.request({
		method: 'DELETE',
		url: Cypress.env("accountAPIUrl") + data.user + userId,
		headers: {
			'Content-Type' : 'application/json',
			'accept' : 'application/json',
			'Authorization': 'Bearer ' + token
		},
		body: body.empty,
		failOnStatusCode: false
	}).should((response) => {
		expect(response.status).to.eq(204)
		return response.body;
	});
})

Cypress.Commands.add("getBooks", (token) => {
	cy.request({
		method: 'GET',
		url: Cypress.env("bookStoreAPIUrl") + data.books,
		headers: {
			'Content-Type' : 'application/json',
			'accept' : 'application/json',
			'Authorization': 'Bearer ' + token
		},
		body: body.empty,
	}).should((response) => {
		expect(response.status).to.eq(200)
		return response.body;
	});
})

Cypress.Commands.add("createNewBookList", (token,userId,book1,book2,book3) => {
	cy.fixture('apiBody').then((bodyRequest) => {
		bodyRequest.createBookList.userId = userId
		bodyRequest.createBookList.collectionOfIsbns[0].isbn = book1
		bodyRequest.createBookList.collectionOfIsbns[1].isbn = book2
		bodyRequest.createBookList.collectionOfIsbns[2].isbn = book3
		cy.request({
			method: 'POST',
			url: Cypress.env("bookStoreAPIUrl") + data.books,
			headers: {
				'Content-Type' : 'application/json',
				'accept' : 'application/json',
				'Authorization': 'Bearer ' + token
			},
			body: bodyRequest.createBookList,
			failOnStatusCode: false
		}).should((response) => {
			expect(response.status).to.eq(201)
			return response.body;
		});
	})
})

Cypress.Commands.add("deleteBooks", (token,userId) => {
	cy.request({
		method: 'DELETE',
		url: Cypress.env("bookStoreAPIUrl") + data.deleteBooks + userId,
		headers: {
			'Content-Type' : 'application/json',
			'accept' : 'application/json',
			'Authorization': 'Bearer ' + token
		},
		body: body.empty,
		failOnStatusCode: false
	}).should((response) => {
		expect(response.status).to.eq(204)
		return response.body;
	});
})

Cypress.Commands.add("getAddress", (postalCode) => {
	cy.request({
		method: 'GET',
		url: 'https://viacep.com.br/ws/'+postalCode+'/json'
	}).should((response) => {
		return response.body;
	});
})