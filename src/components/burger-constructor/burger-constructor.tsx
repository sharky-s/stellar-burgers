import { FC, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  getConstructorBun,
  getConstructorIngredients,
  getConstructorTotalPrice
} from '../../services/selectors/constructor';
import {
  getOrderLoading,
  getCurrentOrder
} from '../../services/selectors/order';
import { selectIsAuth } from '../../services/selectors/user';
import { createOrder } from '../../services/slices/order-slice';
import { clearConstructor } from '../../services/slices/constructor-slice';
import { clearOrder } from '../../services/slices/order-slice';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const bun = useSelector(getConstructorBun);
  const ingredients = useSelector(getConstructorIngredients);
  const orderRequest = useSelector(getOrderLoading);
  const orderModalData = useSelector(getCurrentOrder);
  const isAuth = useSelector(selectIsAuth);

  const constructorItems = {
    bun,
    ingredients
  };

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    if (!isAuth) {
      // Перенаправляем на страницу логина
      window.location.href = '/login';
      return;
    }

    const orderIngredients = [
      bun._id,
      ...(ingredients || []).map(
        (ingredient: TConstructorIngredient) => ingredient._id
      ),
      bun._id
    ];

    dispatch(createOrder(orderIngredients));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearConstructor());
  };

  const price = useSelector(getConstructorTotalPrice);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
