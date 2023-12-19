import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as CartActions from './cart.actions';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class CartEffects {
    addToCartRedirect$ = createEffect(() =>
    this.actions$.pipe(
    ofType(CartActions.addToCart),
    tap(() => this.router.navigate(['/cart']))
   ), { dispatch: false });

  constructor(private actions$: Actions, private router: Router) {}
}
