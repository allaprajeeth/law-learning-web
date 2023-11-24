import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { ModalComponent } from './modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalserviceService {

  constructor(private dialog: MatDialog) { }

  // openModal(data: any): void {
  //   this.dialog.open(ModalComponent, {
  //     width: '800px',
  //     data: data
  //   });
  // }
}
