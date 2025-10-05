import { ingredientsSlice } from '../ingredients';
import { fetchIngredients } from '../../thunk/ingredients-thunk';
import { RequestStatus } from '@utils-types';

const reducer = ingredientsSlice.reducer;

describe('ingredients reducer (async flow)', () => {
  it('pending устанавливает Loading и сбрасывает error', () => {
    const state = reducer(undefined, { type: fetchIngredients.pending.type });
    expect(state.status).toBe(RequestStatus.Loading);
    expect(state.error).toBeNull();
  });

  it('fulfilled записывает данные и ставит Success', () => {
    const payload = [{ _id: '1', name: 'Булка', type: 'bun', price: 100, image: '', image_large: '', image_mobile: '' }];
    const state = reducer(undefined, { type: fetchIngredients.fulfilled.type, payload });
    expect(state.status).toBe(RequestStatus.Success);
    expect(state.ingredients).toEqual(payload);
  });

  it('rejected записывает ошибку и ставит Failed', () => {
    const error = { message: 'Network error' } as any;
    const state = reducer(undefined, { type: fetchIngredients.rejected.type, error });
    expect(state.status).toBe(RequestStatus.Failed);
    expect(state.error).toBe('Network error');
  });
});


