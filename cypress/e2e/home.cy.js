import 'cypress-drag-drop';

describe('testing App', () => {
    beforeEach(function () {
        cy.visit('http://localhost:3000');
        // cy.viewport(1920, 1080);
    })

    it('ingredient details modal', () => {
        cy.visit('http://localhost:3000');

        cy.get('#643d69a5c3f7b9001cfa093c').click();
        cy.wait(2000);
        cy.get('#modals').should('exist');
        cy.get('#modal_close_cross').click();
    });

    it('moves random ingredients to constructor', () => {
        cy.visit('http://localhost:3000');
        cy.get('#643d69a5c3f7b9001cfa093c').drag('#drop');
        cy.get('#643d69a5c3f7b9001cfa0942').drag('#drop');
        cy.get('#643d69a5c3f7b9001cfa0941').drag('#drop');
        cy.get('#643d69a5c3f7b9001cfa0946').drag('#drop');
        cy.get('#643d69a5c3f7b9001cfa093c').drag('#drop');
        // cy.get('#643d69a5c3f7b9001cfa0949').drag('#drop'); // Бага вот тут

        const dataTransfer = new DataTransfer();

        cy.get('#643d69a5c3f7b9001cfa0949').trigger('dragstart', {dataTransfer});
        cy.get('#drop').trigger('drop', {
            dataTransfer
        });

        cy.wait(2000)
        cy.get('button').contains('Оформить заказ').click()
        cy.get('form')
        cy.get('input[name=email]').type('ciberstrigo@gmail.com').should('have.value', 'ciberstrigo@gmail.com')
        cy.get('input[name=password]').type('mangoworms').should('have.value', 'mangoworms')
        cy.get('button').contains('Войти').click()
        cy.wait(2000)
        cy.get('button').contains('Оформить заказ').click()
        cy.wait(20000)
        cy.get('#modal_close_cross').click();
    });
});