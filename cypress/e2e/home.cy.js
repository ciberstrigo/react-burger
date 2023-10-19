import 'cypress-drag-drop';

const dropToConstructor = (ingredientId) => {
    const dataTransfer = new DataTransfer();
    cy.get(ingredientId).trigger('dragstart', {dataTransfer});
    cy.get('#drop').trigger('drop', {dataTransfer});
};

describe('testing App', () => {
    beforeEach(function () {
        cy.visit('http://localhost:3000');
        cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {
            fixture: "mockIngredients.json",
        });
        cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {
            fixture: "mockMakeOrderResponse.json"
        });
        cy.intercept("POST", "https://norma.nomoreparties.space/api/auth/login", {
            fixture: "loginFixture.json"
        });
    })

    it('ingredient details modal', () => {
        cy.get('#643d69a5c3f7b9001cfa093c').click();
        cy.get('#modals').should('exist');
        cy.get('#modal_close_cross').click();
    });

    it('moves random ingredients to constructor, making order and close modal', () => {
        dropToConstructor('#643d69a5c3f7b9001cfa093c');
        dropToConstructor('#643d69a5c3f7b9001cfa0942');
        dropToConstructor('#643d69a5c3f7b9001cfa0941');
        dropToConstructor('#643d69a5c3f7b9001cfa0946');
        dropToConstructor('#643d69a5c3f7b9001cfa093c');
        dropToConstructor('#643d69a5c3f7b9001cfa0949');

        cy.get('button').contains('Оформить заказ').click()
        cy.get('form')
        cy.get('input[name=email]').type('test@data.com')
        cy.get('input[name=email]').should('have.value', 'test@data.com')
        cy.get('input[name=password]').type('password')
        cy.get('input[name=password]').should('have.value', 'password')
        cy.get('button').contains('Войти').click()
        cy.get('button').contains('Оформить заказ').click()
        cy.get('#modals').contains('идентификатор заказа')
        cy.get('#modals').contains('99999')
        cy.get('#modal_close_cross').click();
    });
});