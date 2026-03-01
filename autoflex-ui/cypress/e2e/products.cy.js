/* eslint-disable no-undef */
describe('Gerenciamento de Produtos', () => {
  const nomeDoProduto = 'PRODUTO TESTE CYPRESS';

  beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.contains(/produto/i).click(); 
  });

  it('1. Deve cadastrar o produto', () => {
    cy.contains(/novo produto/i).click();
    
    cy.get('input[name="name"]').type(nomeDoProduto);
    cy.get('input[name="price"]').type('100');
    
    cy.get('button[type="submit"]').click();

    cy.contains(nomeDoProduto).should('be.visible');
  });

  it('2. Deve editar o produto', () => {
    cy.contains(nomeDoProduto)
      .parents('tr')
      .find('button.text-blue-600')
      .click();

    cy.get('input[name="name"]').clear().type(nomeDoProduto + ' EDITADO');
    cy.get('button[type="submit"]').click();

    cy.contains(nomeDoProduto + ' EDITADO').should('be.visible');
  });

  it('3. Deve excluir o produto', () => {
    cy.contains(nomeDoProduto + ' EDITADO')
      .parents('tr')
      .find('button.text-red-600')
      .click();

    cy.contains('button', /excluir/i).click();

    cy.contains(nomeDoProduto + ' EDITADO').should('not.exist');
  });
});