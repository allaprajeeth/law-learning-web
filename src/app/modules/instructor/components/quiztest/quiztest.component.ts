import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TestpreviewComponent } from '../testpreview/testpreview.component';

export class AdditionalForm {
  enteredQuestion: string = '';
  correctAnswer: string = '';
  questionScore: string = '';
  selectchoice: string[] = [];
  quizName: string = '';
  questionType: string = '';
  timePeriod: number = 0;
  choice: number = 1;
  questionNumber: number = 1;
  expanded: boolean = true;
  correctAnswerControl: any;
  enteredChoice: string = '';
}

@Component({
  selector: 'app-quiztest',
  templateUrl: './quiztest.component.html',
  styleUrls: ['./quiztest.component.scss'],
})
export class QuiztestComponent {
  quizName: string = '';
  selectedQuestionType: string = 'multiple-choice';
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
  formsArray: number[] = [];
  additionalForms: AdditionalForm[] = [new AdditionalForm()];
 constructor( public dialog: MatDialog) {}

 hasQuestions(): boolean {
    return this.additionalForms.some(form => form.enteredQuestion.trim() !== '');
}
  closeQuiz() {
    console.log('Quiz closed!');
  }
  addQuestion() {
    this.isAddingQuestion = true;
  }

  addChoice(formIndex: number) {
    const form = this.additionalForms[formIndex];

    // Check if the entered choice already exists in the selectchoice array
    const isDuplicate = form.selectchoice.includes(form.enteredChoice);

    if (!isDuplicate) {
      // Only add empty strings if the selectchoice array is empty
      if (form.selectchoice.length === 0) {
        for (let i = 0; i < 4; i++) {
          form.selectchoice.push('');
        }
      } else {
        form.selectchoice.push('');
      }

      // Ensure at least one choice matches the correct answer
      this.validateCorrectAnswer(form);
    }
    // No need for an else block if you don't want to handle the duplicate case
  }

  validateCorrectAnswer(form: AdditionalForm) {
    const hasMatchingChoice = form.selectchoice.some(
      (choice) => choice === form.correctAnswer
    );
    // If no matching choice and the correct answer control is dirty or touched, set the correct answer to the first choice
    if (
      !hasMatchingChoice &&
      (form.correctAnswerControl?.touched ||
        form.correctAnswerControl?.dirty) &&
      form.selectchoice.length > 0
    ) {
      form.correctAnswer = form.selectchoice[0];
    }
  }

  isCorrectAnswerInvalid(
    form: AdditionalForm,
    correctAnswerControl: any
  ): boolean {
    return (
      form.selectchoice.length > 0 &&
      !form.selectchoice.includes(form.correctAnswer) &&
      (correctAnswerControl?.touched || correctAnswerControl?.dirty)
    );
  }

  addAdditionalForm() {
    const newForm = new AdditionalForm();
    newForm.questionNumber = this.additionalForms.length + 1;
    // Set the question type based on the selected question type in the main component
    newForm.questionType = this.questionType;
    this.additionalForms.push(newForm);
  }

  numberOfFormsArray(): number[] {
    return this.formsArray;
  }
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
    if (this.selectedQuestionType === 'multiple-choice') {
      return (
        this.quizName.trim() !== '' &&
        this.timePeriod > 0 &&
        this.additionalForms.every(
          (form) =>
            form.enteredQuestion.trim() !== '' &&
            form.correctAnswer.trim() !== ''
        )
      );
    } else if (this.questionType === 'short-answer') {
      return (
        this.quizName.trim() !== '' &&
        this.timePeriod > 0 &&
        this.additionalForms.every(
          (form) => form.enteredQuestion.trim() !== ''
        )
      );
    }
  
    return false; // Default to false if the question type is not recognized
  }


  submitTest() {}
  previewQuestions() {
    console.log('Additional Forms:', this.additionalForms);

    this.additionalForms[0].questionType = this.questionType

    const aggregatedData = this.additionalForms.map((form, index) => ({
      questionNumber: index + 1,
      enteredQuestion: form.enteredQuestion,
      selectchoice: form.selectchoice,
      correctAnswer: form.correctAnswer,
      questionScore: form.questionScore,
      questionType: form.questionType,
    }));

    console.log('Aggregated Data:', aggregatedData);

    const dialogRef = this.dialog.open(TestpreviewComponent, {
      width: '800px',
      data: aggregatedData,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  // Inside the QuiztestComponent class
  isChoiceDuplicate(form: AdditionalForm, index: number): boolean {
    const currentChoice = form.selectchoice[index];
    return form.selectchoice.indexOf(currentChoice) !== index;
  }

  // Inside the QuiztestComponent class
  isChoiceInvalid(form: AdditionalForm, index: number): boolean {
    const currentChoice = form.selectchoice[index];
    return (
      form.selectchoice.indexOf(currentChoice) !== index &&
      currentChoice.trim() !== ''
    );
  }
}
