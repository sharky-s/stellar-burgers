import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ProfileMenuUI } from '@ui';
import { userActions } from '../../services/slices/user';
import { useDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userActions.logout());
    navigate('/');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
