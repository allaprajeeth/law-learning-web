import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Categories {
  viewValue: string;
}
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit  {
 
  title = 'my-first-app';
  categories: Categories[] = [
    { viewValue: 'Beginner' },
    { viewValue: 'Intermediate' },
    { viewValue: 'Expert' },
    { viewValue: 'Student' },
  ];

  mycoursesimages: string[] = [];
  availablecoursesimages: string[] = [];

  headings: string[] = [
    'Angular - The Complete Guide (2023 Edition)',
    '[LEGACY] NJS',
    'Complete React Developer in 2023 (w/ Redux, Hooks,...)',
    'Web Security & Bug Bounty: Learn Penetration Testing in...',
    'Complete Angular Developer in 2023: Zero to Mastery',
    '[LEGACY] JTS',
    'Master the Coding Interview: Big Tech (FAANG) Interviews',
    'Master the Coding Interview: Data Structures + Algorithms',
    'Java Programming Masterclass updated to Java 17',
    'Complete React Native in 2023: Zero to Mastery (with...',
    'Microsoft Excel - Excel from Beginner to Advanced',
    'Complete Web & Mobile Designer in 2023: UI/UX,...',
  ];
  paragraphs: string[] = [
    'Maximilian Schwarzmuller',
    'Andrei Neagoie, Ankita Kulkarni',
    'Andrei Neagoie, Yihua Zhang',
    'Andrei Neagoie, Aleksa Tamburkovski',
    'Andrei Neagoie, Luis Ramirez Jr',
    'Andrei Neagoie',
    'Andrei Neagoie, Yihua Zhang',
    'Andrei Neagoie',
    "Tim Buchalka, Tim Buchalka's Learn...",
    'Andrei Neagoie, Mo Binni',
    'Kyle Pew, Office Newb',
    'Andrei Neagoie, Daniel Schifano',
  ];

  randomMyCourseValues: number[] = [];
  randomAvailableCourses: number[] = [];
  randomSubscribersVales: number[] = [];

  ngOnInit(): void {
    for (let i = 0; i < 4; i++) {
      const randomImageURL = `https://picsum.photos/300/200?random=${i}`;
      this.mycoursesimages.push(randomImageURL);
      const randomValue = Math.floor(Math.random() * 100) + 1;
      this.randomMyCourseValues.push(randomValue);
    }

    for (let j = 0; j < 12; j++) {
      const randomImageURL = `https://picsum.photos/300/200?random=${j}`;
      this.availablecoursesimages.push(randomImageURL);
      const randomValue = Math.floor(Math.random() * 100) + 1;
      this.randomAvailableCourses.push(randomValue);
      const randomSubscribers = Math.floor(Math.random() * 100) + 10;
      this.randomSubscribersVales.push(randomSubscribers);
    }
  }


  // category!: string;

  constructor(private route: ActivatedRoute) { }

  // ngOnInit(): void {
  //   // Get the category parameter from the route
  //   this.route.paramMap.subscribe(params => {
  //     this.category = params.get('category');
  //   });
  // }

}
