import { Component, EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-submitmesg',
  templateUrl: './submitmesg.component.html',
  styleUrls: ['./submitmesg.component.scss']
})
export class SubmitmesgComponent {
  @Output() closeClicked = new EventEmitter<void>();

  constructor(private location: Location) {}

  closePage() {
    this.closeClicked.emit();
    this.location.back(); // This will navigate back to the previous page
  }
}
