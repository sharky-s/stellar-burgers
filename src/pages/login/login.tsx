import { FC, SyntheticEvent, useState } from 'react';

import { LoginUI } from '@ui-pages';
import { userActions } from '../../services/slices/user';
import { useDispatch } from '../../services/store';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(userActions.loginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
