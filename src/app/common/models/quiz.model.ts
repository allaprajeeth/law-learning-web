export interface Quiz {
  id: number;
  name: string;
  quizType: string;
  time: number;
  createdDate: string;
  updatedDate: string;
  questions: Question[];
}

export interface Question {
  id: number;
  question: string;
  answer: string;
  options: Option[];
}

export interface Option {
  id: number;
  option: string;
}
