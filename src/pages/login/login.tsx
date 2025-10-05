import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { loginUser } from '../../services/slices/user-slice';
import { getUserError } from '../../services/selectors/user';
import { LoginUI } from '@ui-pages';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const error = useSelector(getUserError);

  const from = (location.state as any)?.from?.pathname || '/';

  useEffect(
    () =>
      // Очищаем ошибку при размонтировании компонента
      () => {
        dispatch({ type: 'user/clearError' });
      },
    [dispatch]
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((result) => {
      if (result.type === 'user/loginUser/fulfilled') {
        navigate(from, { replace: true });
      }
    });
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
