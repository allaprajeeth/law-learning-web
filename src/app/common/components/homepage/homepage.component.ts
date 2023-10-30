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
  showCard: boolean[] = Array(12).fill(false);
  randomMyCourseValues: number[] = [];
  randomAvailableCourses: number[] = [];
  randomSubscribersVales: number[] = [];

  ngOnInit(): void {
    for (let i = 0; i < 12; i++) {
      const randomImageURL = `https://picsum.photos/300/200?random=${i}`;
      this.availablecoursesimages.push(randomImageURL);
    }
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

  tooltipPosition: {
    left: string;
    right: string;
    top: string;
    display: string;
  } = { left: '0', right: 'unset', top: '0', display: 'none' };

  openMyMenu(index: number, event: MouseEvent): void {
    this.showCard = this.showCard.map((_, i) => i === index);

    if (this.showCard[index]) {
      const element = event.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();

      if (rect.left + rect.width / 2 > window.innerWidth / 2) {
        this.tooltipPosition = {
          left: 'unset',
          right: `${window.innerWidth - rect.left}px`,
          top: `${rect.top}px`,
          display: 'block',
        };

        const courseCardPosition = { top: '-40px', right: '277px' };
        Object.assign(this.tooltipPosition, courseCardPosition);
      } else {
        this.tooltipPosition = {
          left: `${rect.left}px`,
          right: 'unset',
          top: `${rect.top}px`,
          display: 'block',
        };

        const courseCardPosition = { top: '-40px', left: '277px' };
        Object.assign(this.tooltipPosition, courseCardPosition);
      }
    }
  }

  closeMyMenu(index: number): void {
    this.showCard[index] = false;
  }
  courseContent: string[] = [
    'Understanding the legal system and The role of law in society',
    'Types of crimes and Criminal procedure and evidence',
    'Tort law and Contract law and Legal dispute resolution',
    'Structure of government and Individual rights and liberties',
    'Finding and citing legal sources and Drafting legal documents',
    'Marriage and divorce and Child custody and support',
    'Property ownership and Real estate transactions',
    'Copyrights, trademarks, and patents and Protecting intellectual property',
    'Environmental regulations and Conservation and sustainability',
    'Employee rights and labor unions and Workplace discrimination and harassment',
    'Treaties and international organizations and Human rights and humanitarian law',
    'Regulations in the financial industry and Banking contracts and transactions',
  ];

  // category!: string;

  constructor(private route: ActivatedRoute) { }

  // ngOnInit(): void {
  //   // Get the category parameter from the route
  //   this.route.paramMap.subscribe(params => {
  //     this.category = params.get('category');
  //   });
  // }

}
