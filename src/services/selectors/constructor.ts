import { RootState } from '../root-reducer';

export const getConstructorBun = (state: RootState) => state.constructor.bun;
export const getConstructorIngredients = (state: RootState) =>
  state.constructor.ingredients || [];

export const getConstructorTotalPrice = (state: RootState) => {
  const bun = state.constructor.bun;
  const ingredients = state.constructor.ingredients || [];

  const bunPrice = bun ? bun.price * 2 : 0;
  const ingredientsPrice = ingredients.reduce(
    (sum, ingredient) => sum + ingredient.price,
    0
  );

  return bunPrice + ingredientsPrice;
};

export const getConstructorOrder = (state: RootState) => {
  const bun = state.constructor.bun;
  const ingredients = state.constructor.ingredients || [];

  if (!bun) return [];

  return [bun._id, ...ingredients.map((ingredient) => ingredient._id), bun._id];
};
