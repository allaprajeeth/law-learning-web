import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TestpreviewComponent } from '../testpreview/testpreview.component';


export class AdditionalForm {
  enteredQuestion: string = '';
  correctAnswer: string = '';
  questionScore: string = '';
  selectchoice: string[] = [];
  quizName: string = '';
  questionType: string = '';
  timePeriod: number = 0;
  choice:number=1;
  questionNumber: number = 1;
  expanded: boolean = true;
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
  // router: any;

  constructor(private _snackBar: MatSnackBar, private router: Router, public dialog: MatDialog) {}
  
  
  closeQuiz() {
    console.log('Quiz closed!');
  }
  addQuestion() {
    this.isAddingQuestion = true;
  }

// addChoice(formIndex: number) {
//   const form = this.additionalForms[formIndex];
//   for (let i = 0; i < 4; i++) {
//     form.selectchoice.push(''); // Push empty strings to the choices array of the specific form
//   }
// }

addChoice(formIndex: number) {
  const form = this.additionalForms[formIndex];
  
  // Only add empty strings if the selectchoice array is empty
  if (form.selectchoice.length === 0) {
    for (let i = 0; i < 4; i++) {
      form.selectchoice.push(''); // Push empty strings to the choices array of the specific form
    }
  }
}


// addChoice(formIndex: number) {
//   const form = this.additionalForms[formIndex];

//   // Only add empty strings if the selectchoice array is empty
//   if (!form.selectchoice || form.selectchoice.length === 0) {
//     form.selectchoice = ['']; // Initialize the array with one empty string
//   } else {
//     form.selectchoice.push(''); // Add an additional empty string to the existing array
//   }
// }


// addAdditionalForm() {
//   this.additionalForms.push(new AdditionalForm());
// }
addAdditionalForm() {
  const newForm = new AdditionalForm();
  newForm.questionNumber = this.additionalForms.length + 1; 
  newForm.questionType = this.questionType;
  this.additionalForms.push(newForm);
}

numberOfFormsArray(): number[] {
  return this.formsArray;
}
// deleteForm(index: number) {
//   this.additionalForms.splice(index, 1);
// }

deleteForm(index: number) {
  this.additionalForms.splice(index, 1);

  // Recompute question numbers for the remaining forms
  this.additionalForms.forEach((form, i) => {
    form.questionNumber = i + 1;
  });
}
deleteChoice(form: AdditionalForm, index: number) {
  form.selectchoice.splice(index, 1);
}


trackByFn(index: number, choice: string): any {
  return index;
}
toggleExpand(form: AdditionalForm) {
  form.expanded = !form.expanded;
}

isValid(): boolean {
  const isValid =
    this.quizName.trim() !== '' &&
    this.timePeriod > 0 &&
    this.additionalForms.every(
      (form) => form.enteredQuestion.trim() !== '' && form.correctAnswer.trim() !== ''
    );

  return isValid;
}

submitTest() {
  const isValid = this.isValid();

  if (isValid) {
    // Perform any additional actions before submitting the test

    // Show a snackbar
    this.openSnackBar('Your test form submitted successfully wait for response. Thank you!', 5000);
    setTimeout(() => {
      this.router.navigate(['/instructor/upload']);
    }, 5000);
  }
}

openSnackBar(message: string, duration: number) {
  this._snackBar.open(message, 'Close', {
    duration: duration,
    verticalPosition: 'top', // Set the vertical position to 'top'
  });
}

previewQuestions() {
  const aggregatedData = this.additionalForms.map((form, index) => ({
    questionNumber: index + 1,
    enteredQuestion: form.enteredQuestion,
    selectchoice: form.selectchoice,
    correctAnswer: form.correctAnswer,
    questionScore: form.questionScore
  }));

  const dialogRef = this.dialog.open(TestpreviewComponent, {
    width: '800px',
    data: aggregatedData, // Pass the aggregated data to the dialog
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
}
