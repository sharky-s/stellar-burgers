import { RootState } from '../root-reducer';

export const getIngredients = (state: RootState) => state.ingredients.items;
export const getIngredientsLoading = (state: RootState) =>
  state.ingredients.loading;
export const getIngredientsError = (state: RootState) =>
  state.ingredients.error;

export const getIngredientsByType = (state: RootState, type: string) =>
  state.ingredients.items.filter((ingredient) => ingredient.type === type);

export const getIngredientById = (state: RootState, id: string) =>
  state.ingredients.items.find((ingredient) => ingredient._id === id);
