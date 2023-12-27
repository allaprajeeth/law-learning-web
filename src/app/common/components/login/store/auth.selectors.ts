// auth.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectJwtToken = createSelector(selectAuthState, (state) => state.user.jwtToken);
export const selectLoggedInUserEmail = createSelector(selectAuthState, (state) => state.user.userEmail);
