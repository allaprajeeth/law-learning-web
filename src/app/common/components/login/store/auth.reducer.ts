import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export class AuthState {
 user: userModel = new userModel();
}

export class userModel {
  jwtToken: string | undefined = '';
  userEmail: string | undefined = '';
  name: string | undefined = '';
  phone: string | undefined = '';
}

export const initialState: AuthState = new AuthState();

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user }) => ({ ...state, user })),

);
