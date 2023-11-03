import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  isMaximized: boolean = false;
  modalMaxHeight: string;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Calculate maximum height based on viewport height
    const viewportHeight = window.innerHeight;
    this.modalMaxHeight = `${viewportHeight * 0.7}px`; // Adjust the multiplier (0.7) as needed
  }

  onMinimizeClick(): void {
    this.isMaximized = false;
    this.updateModalSize();
  }

  onMaximizeClick(): void {
    this.isMaximized = true;
    this.updateModalSize();
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  private updateModalSize(): void {
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
      modalContent.classList.toggle('maximized', this.isMaximized);
    }
  }
}
