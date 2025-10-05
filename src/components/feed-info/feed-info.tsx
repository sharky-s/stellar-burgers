import { FC } from 'react';

import { TOrder } from '@utils-types';
import { feedSelectors } from '../../services/slices/feed';
import { useSelector } from '../../services/store';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector(feedSelectors.feedOrdersSelector);
  const feed = {
    total: useSelector(feedSelectors.totalSelector),
    totalToday: useSelector(feedSelectors.totalTodaySelector)
  };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
