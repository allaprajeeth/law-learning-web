import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  // openModal(data: any): void {
  //   this.dialog.open(ModalComponent, {
  //     width: '800px',
  //     data: data
  //   });
  // }
}
