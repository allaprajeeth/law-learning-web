import { Component } from '@angular/core';

export class AdditionalForm {
  enteredQuestion: string = '';
  correctAnswer: string = '';
  questionScore: string = '';
  selectchoice: string[] = [];
  quizName: string = '';
  questionType: string = '';
  timePeriod: number = 0;
}

@Component({
  selector: 'app-quiztest',
  templateUrl: './quiztest.component.html',
  styleUrls: ['./quiztest.component.scss']
})
export class QuiztestComponent {

  
  quizName: string = '';
  questionType: string = '';
  sectionTimer: number = 0;
  timePeriod: number = 0;
  isAddingQuestion: boolean = false;
  enteredQuestion: string = '';
  enteredChoice: string = '';
  correctAnswer: string = '';
  questionScore: string = '';
  choices: string[] = [];
  numberOfForms: number = 0; 
  formsArray: number[] = []
  additionalForms: AdditionalForm[] = [
    new AdditionalForm(), 
  ];

  closeQuiz() {
    console.log('Quiz closed!');
  }
  addQuestion() {
    this.isAddingQuestion = true;
  }

addChoice(formIndex: number) {
  const form = this.additionalForms[formIndex];
  for (let i = 0; i < 4; i++) {
    form.selectchoice.push(''); // Push empty strings to the choices array of the specific form
  }
}

deleteChoice(form: AdditionalForm, index: number) {
  form.selectchoice.splice(index, 1);
}
addAdditionalForm() {
  this.additionalForms.push(new AdditionalForm());
}
numberOfFormsArray(): number[] {
  return this.formsArray;
}
deleteForm(index: number) {
  this.additionalForms.splice(index, 1);
}


}