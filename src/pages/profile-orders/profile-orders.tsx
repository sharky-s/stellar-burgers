import { FC, useEffect } from 'react';

import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { ordersActions, ordersSelectors } from '../../services/slices/orders';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const userOrders: TOrder[] = useSelector(ordersSelectors.ordersSelector);

  useEffect(() => {
    dispatch(ordersActions.fetchOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={userOrders} />;
};
