import { Component } from '@angular/core';

@Component({
  selector: 'app-revert-delete',
  templateUrl: './revert-delete.component.html',
  styleUrls: ['./revert-delete.component.scss']
})
export class RevertDeleteComponent {
  isDeleted: boolean = true; // Set to true for demonstration, change as needed

  constructor() { }

  revertDelete() {
    // Implement your logic to revert the delete operation
    console.log('Delete operation reverted.');
    this.isDeleted = false; // Update the flag after reverting the delete operation
  }
}
