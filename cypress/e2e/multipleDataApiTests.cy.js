
describe("API Feature", () => {

    const postalCodes = [{
        postalCode: '30710580',
        logradouro: 'Rua Padre Eustáquio',
        bairro: 'Carlos Prates',
        localidade: 'Belo Horizonte',
        uf: 'MG',
        ddd: '31'
    },
    {
        postalCode: '41720075',
        logradouro: 'Rua Jayme Sapolnik',
        bairro: 'Imbuí',
        localidade: 'Salvador',
        uf: 'BA',
        ddd: '71'
    },
    {
        postalCode: '22070000',
        logradouro: 'Avenida Atlântica',
        bairro: 'Copacabana',
        localidade: 'Rio de Janeiro',
        uf: 'RJ',
        ddd: '21'
    }
]

postalCodes.forEach(address => {
    it(`Scenario: Checking ${address.localidade} postal code`, function () {
            cy.getAddress(address.postalCode).then(resp => {
                expect(resp.status).to.eq(200)
                expect(resp.body.logradouro).to.equal(address.logradouro)
                expect(resp.body.bairro).to.equal(address.bairro)
                expect(resp.body.localidade).to.equal(address.localidade)
                expect(resp.body.uf).to.equal(address.uf)
                expect(resp.body.ddd).to.equal(address.ddd)
            })
        })
    });
})