import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TestpreviewComponent } from '../testpreview/testpreview.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { endPoints } from 'src/app/common/constants/endpoints';
import { Course } from 'src/app/common/models/course.model';
import { Quiz } from 'src/app/common/models/quiz.model';
import { QuizService } from 'src/app/common/services/quiz/quiz.service';

export class AdditionalForm {
  enteredQuestion: string = '';
  correctAnswer: string = '';
  questionScore: string = '';
  selectchoice: string[] = [];
  quizName: string = '';
  questionType: string | undefined;
  timePeriod: number = 0;
  choice: number = 1;
  questionNumber: number = 1;
  expanded: boolean = true;
  correctAnswerControl: any;
  enteredChoice: string = '';
  options: Option[] = [];
}
export interface Option {
  id: number;
  option: string;
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

  @Input()  courseId!: number;

  // @Input() course: Course = new Course();

  hasTest:boolean | undefined;
  quizData :Quiz | undefined 

  constructor(public dialog: MatDialog, private http: HttpClient, private quizService: QuizService) {}

  ngOnInit(): void {
    this.getQuiz(this.courseId);
  }

  hasQuestions(): boolean {
    return this.additionalForms.some(
      (form) => form.enteredQuestion.trim() !== ''
    );
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
  }

  validateCorrectAnswer(form: AdditionalForm) {
    const hasMatchingChoice = form.selectchoice.some(
      (choice) => choice === form.correctAnswer
    );

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
        this.additionalForms.every((form) => form.enteredQuestion.trim() !== '')
      );
    }

    return false;
  }

  submitTest() {
    const quizData = {
      // id:this.courseId ,
      name: this.quizName,
      quizType: 'MULTIPLE_CHOICE',
      time: this.timePeriod,
      questions: this.additionalForms.map((form) => ({
        question: form.enteredQuestion,
        options: form.selectchoice.map((option, index) => ({
          //id: index + 1,
          option: option,
        })),
        answer: form.correctAnswer,
      })),
    };

    if (quizData) {
      const baseUrl = endPoints.secureBaseURL;
      const apiUrl = baseUrl + `/course/${this.courseId}/quiz`;
      this.http.post<any>(apiUrl, quizData).subscribe(
        (response) => {
          console.log(response);
          
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Quiz data is undefined');
    }
  }
  previewQuestions() {
    console.log('Additional Forms:', this.additionalForms);
    this.additionalForms[0].questionType = this.questionType;
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
 
  getQuiz(courseId: number) {
    this.quizService.getQuiz(courseId).subscribe(
      (response: any) => {
        if (response.data && response.data.length > 0 && response.data[0].questions && response.data[0].questions.length > 0) {
          this.hasTest = true;
        }
        this.quizData = response.data[0];
      }
    );
  }

  updateHasTest(value: boolean) {
    this.hasTest = value;
  }
}
