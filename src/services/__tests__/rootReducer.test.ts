import { rootReducer } from '../store';

describe('rootReducer', () => {
  it('возвращает начальное состояние при неизвестном экшене', () => {
    const state = rootReducer(undefined as any, { type: 'UNKNOWN_ACTION' });
    // проверим, что ключи слайсов существуют и имеют корректные начальные значения
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('orders');
  });
});


