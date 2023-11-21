import { Component, EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-successmesg',
  templateUrl: './successmesg.component.html',
  styleUrls: ['./successmesg.component.scss']
})
export class SuccessmesgComponent {
  @Output() closeClicked = new EventEmitter<void>();

  constructor(private location: Location) {}

  closePage() {
    this.closeClicked.emit();
    this.location.back(); // This will navigate back to the previous page
  }
}
