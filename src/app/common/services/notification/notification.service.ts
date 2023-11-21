import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private matSnackBar: MatSnackBar,) { }

  notify(message: string,  duration: number=10000) {
    this.matSnackBar.open(message, 'Close', {
      duration,
      verticalPosition: 'top',

    });
  }
}
