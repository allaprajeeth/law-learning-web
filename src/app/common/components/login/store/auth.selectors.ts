// auth.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { state } from '@angular/animations';

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectJwtToken = createSelector(selectAuthState, (state) => state.user.jwtToken);
export const selectLoggedInUserEmail = createSelector(selectAuthState, (state) => state.user.userEmail);
export const selectLoggedInUserPhone = createSelector(selectAuthState, (state)=> state.user.phone);
export const selectLoggedInUserName = createSelector(selectAuthState, (state)=> state.user.name);