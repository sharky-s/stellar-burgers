import { RootState } from '../root-reducer';

export const selectIsAuth = (state: RootState) => state.user.isAuth;

export const selectUser = (state: RootState) => ({
  name: state.user.user?.name ?? '',
  email: state.user.user?.email ?? ''
});

export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;

export const getUser = (state: RootState) => state.user.user;
export const getUserLoading = (state: RootState) => state.user.loading;
export const getUserError = (state: RootState) => state.user.error;
export const getIsAuth = (state: RootState) => state.user.isAuth;
