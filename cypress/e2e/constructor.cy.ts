describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.window().then((w) => w.localStorage.removeItem('refreshToken'));
  });

  it('добавляет ингредиент в конструктор', () => {
    cy.contains('Краторная булка N-200i')
      .closest('li')
      .within(() => {
        cy.contains('Добавить').click({ force: true });
      });
    cy.contains('Выберите булки').should('not.exist');
  });

  it('открывает и закрывает модалку ингредиента', () => {
    cy.contains('Филе Люминесцентного тетра-лосося').click();
    cy.get('[data-testid="modal"]').should('exist');
    cy.get('[data-testid="modal"]').within(() => {
      cy.contains('Филе Люминесцентного тетра-лосося');
      cy.get('[data-testid="modal-close"]').click();
    });
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('создаёт заказ и очищает конструктор', () => {
    // подставим токены
    cy.window().then((w) => w.localStorage.setItem('refreshToken', 'test-refresh'));
    cy.setCookie('accessToken', 'test-access');

    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('postOrder');

    // собрать бургер: булка + начинка + булка
    cy.contains('Краторная булка N-200i')
      .closest('li')
      .within(() => {
        cy.contains('Добавить').click({ force: true });
      });
    cy.contains('Филе Люминесцентного тетра-лосося')
      .closest('li')
      .within(() => {
        cy.contains('Добавить').click({ force: true });
      });

    cy.contains('Оформить заказ').click();
    cy.wait(['@getUser', '@postOrder']);

    // проверка модалки номера заказа
    cy.get('[data-testid="modal"]').should('exist').within(() => {
      cy.contains('12345');
      cy.get('[data-testid="modal-close"]').click();
    });

    cy.get('[data-testid="modal"]').should('not.exist');

    // проверка очистки конструктора (зависит от UI, делаем базовую проверку)
    cy.contains('Выберите булки');
  });
});


