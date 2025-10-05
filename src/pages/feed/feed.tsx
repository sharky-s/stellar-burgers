import { FC, useEffect } from 'react';

import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { feedActions, feedSelectors } from '../../services/slices/feed';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const feedOrders: TOrder[] = useSelector(feedSelectors.feedOrdersSelector);

  useEffect(() => {
    dispatch(feedActions.fetchFeeds());
  }, [dispatch]);

  if (!feedOrders.length) {
    return <Preloader />;
  }

  const refreshFeeds = () => dispatch(feedActions.fetchFeeds());

  return <FeedUI orders={feedOrders} handleGetFeeds={refreshFeeds} />;
};
