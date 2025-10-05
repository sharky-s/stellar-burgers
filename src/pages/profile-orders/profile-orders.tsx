import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getUserOrders } from '../../services/selectors/user-orders';
import { fetchUserOrders } from '../../services/slices/user-orders-slice';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getUserOrders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
