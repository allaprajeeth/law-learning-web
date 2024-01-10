//auth.actions.ts
import { createAction, props } from '@ngrx/store';

export const loginClick = createAction('[Auth] Login Click', props<{ data: any }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: any }>());
