// auth.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError,  switchMap } from 'rxjs/operators';
import { EMPTY} from 'rxjs';
import * as AuthActions from './auth.actions';
import { LoginService } from '../services/login.service';


@Injectable()
export class AuthEffects {
loginClick$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginClick),
      switchMap((action) =>
        this.loginService.loginClick(action.data).pipe(
          map((response: any) => AuthActions.loginSuccess({ 
            user: { 
              jwtToken: response.data.jwt_token,
              userEmail: response.data.user.email,
              name: response.data.user.name,
              phone: response.data.user.phone,
            }
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
   
  ) {}
}
