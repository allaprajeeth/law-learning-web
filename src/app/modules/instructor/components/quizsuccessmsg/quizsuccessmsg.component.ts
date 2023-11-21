import { Component, EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quizsuccessmsg',
  templateUrl: './quizsuccessmsg.component.html',
  styleUrls: ['./quizsuccessmsg.component.scss']
})
export class QuizsuccessmsgComponent {
  @Output() closeClicked = new EventEmitter<void>();

  constructor(private location: Location) {}

  // closePage() {
  //   this.closeClicked.emit();
  //   this.location.back(); 
  // }
}
