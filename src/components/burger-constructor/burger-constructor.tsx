import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  burgerConstructorActions,
  burgerConstructorSelectors
} from '../../services/slices/burgerConstructor';
import { orderActions, orderSelectors } from '../../services/slices/order';
import { userSelectors } from '../../services/slices/user';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = {
    bun: useSelector(burgerConstructorSelectors.bunSelector),
    ingredients: useSelector(burgerConstructorSelectors.ingredientsSelector)
  };

  const isOrderRequest = useSelector(orderSelectors.orderRequestSelector);

  const orderModalData = useSelector(orderSelectors.orderSelector);

  const user = useSelector(userSelectors.userDataSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || isOrderRequest) return;

    if (!user) {
      return navigate('/login');
    }

    if (constructorItems.bun._id && constructorItems.ingredients.length) {
      const orderData = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems.bun._id
      ];

      dispatch(orderActions.fetchNewOrder(orderData))
        .unwrap()
        .then(() => {
          dispatch(burgerConstructorActions.clearConstructor());
        })
        .catch((error) => console.error(error));
    }
  };

  const closeOrderModal = () => {
    dispatch(orderActions.clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={isOrderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
