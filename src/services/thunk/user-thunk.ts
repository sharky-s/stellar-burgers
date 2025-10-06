import { createAsyncThunk } from '@reduxjs/toolkit';

import { USER_SLICE_NAME } from '../slices/sliceNames';
import { userActions } from '../slices/user';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../../utils/cookie';

// получение информации о текущем пользователе (проверяет пользователя по токену)
export const fetchUser = createAsyncThunk(
  `${USER_SLICE_NAME}/fetchUser`,
  getUserApi
);

export const registerUser = createAsyncThunk(
  `${USER_SLICE_NAME}/registerUser`,
  async (registrationData: TRegisterData) => {
    const authPayload = await registerUserApi(registrationData);
    setCookie('accessToken', authPayload.accessToken);
    localStorage.setItem('refreshToken', authPayload.refreshToken);
    return authPayload;
  }
);

export const loginUser = createAsyncThunk(
  `${USER_SLICE_NAME}/loginUser`,
  async (credentials: TLoginData) => {
    const authPayload = await loginUserApi(credentials);
    setCookie('accessToken', authPayload.accessToken);
    localStorage.setItem('refreshToken', authPayload.refreshToken);
    return authPayload;
  }
);

export const updateUser = createAsyncThunk(
  `${USER_SLICE_NAME}/updateUser`,
  updateUserApi
);

export const logout = createAsyncThunk(
  `${USER_SLICE_NAME}/logout`,
  (_, { dispatch }) => {
    logoutApi()
      .then(() => {
        localStorage.clear();
        deleteCookie('accessToken');
        dispatch(userActions.userLogout());
      })
      .catch(() => {
        console.error('Ошибка выполнения выхода');
      });
  }
);
