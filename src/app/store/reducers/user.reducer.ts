import { createReducer, on } from '@ngrx/store';
import * as usersAction from '../actions/user.action';

export const initialState: any = {
  user: {},
  error: null,
};

export const usersReducer = createReducer(
  initialState,
  on(usersAction.login, (state, { user }) => ({
    ...state,
    user,
  })),
  on(usersAction.loginFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
