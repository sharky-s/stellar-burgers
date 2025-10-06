import { TIngredient } from '@utils-types';
import { burgerConstructorSlice, burgerConstructorActions } from '../burgerConstructor';

const reducer = burgerConstructorSlice.reducer;

const bun = { _id: 'bun1', name: 'Булка', type: 'bun', price: 100, image: '', image_large: '', image_mobile: '' } as TIngredient;
const main1 = { _id: 'main1', name: 'Котлета', type: 'main', price: 200, image: '', image_large: '', image_mobile: '' } as TIngredient;
const main2 = { _id: 'main2', name: 'Сыр', type: 'main', price: 50, image: '', image_large: '', image_mobile: '' } as TIngredient;

describe('burgerConstructor reducer', () => {
  it('добавляет булку', () => {
    const state = reducer(undefined, burgerConstructorActions.addIngredient(bun));
    expect(state.bun?._id).toBe('bun1');
    expect(state.ingredients).toHaveLength(0);
  });

  it('добавляет начинку', () => {
    let state = reducer(undefined, burgerConstructorActions.addIngredient(bun));
    state = reducer(state, burgerConstructorActions.addIngredient(main1));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe('main1');
  });

  it('удаляет ингредиент по id', () => {
    let state = reducer(undefined, burgerConstructorActions.addIngredient(main1));
    state = reducer(state, burgerConstructorActions.addIngredient(main2));
    const idToRemove = state.ingredients[0].id; // сгенерированный prepare id
    state = reducer(state, burgerConstructorActions.removeIngredient(idToRemove));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe('main2');
  });

  it('меняет порядок ингредиентов: moveUp/moveDown', () => {
    let state = reducer(undefined, burgerConstructorActions.addIngredient(main1));
    state = reducer(state, burgerConstructorActions.addIngredient(main2));
    // сейчас [main1, main2]; переместим второй вверх -> [main2, main1]
    state = reducer(state, burgerConstructorSlice.actions.moveUp(1));
    expect(state.ingredients.map((i) => i._id)).toEqual(['main2', 'main1']);
    // переместим первый вниз -> [main1, main2]
    state = reducer(state, burgerConstructorSlice.actions.moveDown(0));
    expect(state.ingredients.map((i) => i._id)).toEqual(['main1', 'main2']);
  });
});
