import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


interface Categories {
  viewValue: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{
  selectedFilter: string = ''; 

  categories: Categories[] = [
    { viewValue: 'Beginner' },
    { viewValue: 'Intermediate' },
    { viewValue: 'Expert' },
    { viewValue: 'Student' },
  ];


  rejectedimages:string[]=[];
  mycoursesimages: string[] = [];
  availablecoursesimages: string[] = [];
  uploadedimages: string[] = [];

  subscribersValues = ["10", "50", "100", "200", "500", "1000"];

  uploadedCoursesDurations: string[] = [];
  availableCoursesDurations: string[] = [];
  rejectedCoursesDurations: string[] = [];
  myCoursesDurations: string[] = [];

  availableCourseSubscribers: string[] = [];
  
  j: number = 0; 

  isHovered: boolean[] = new Array(this.availablecoursesimages.length).fill(false);

  headings: string[] = [
    'Constitutional Law',
    'Criminal Law',
    'Civil Procedure',
    'Contract Law',
    'Tort Law',
    'Property Law',
    'Administrative Law',
    'International Law',
    'Family Law',
    'Environmental Law',
    'Intellectual Property Law',
    'Human Rights Law',
  ];
  uploadedheadings: string[] = [
    'Constitutional Law',
    'Criminal Law',
    'Civil Procedure',
    'Contract Law',
    'Tort Law',
    'Property Law',
    'Administrative Law',
    'International Law',
    'Family Law',
    'Environmental Law',
    'Intellectual Property Law',
    'Human Rights Law',
  ];
  
  reviewCoursesAuthors: string[] = [
    'John Smith',
    'Mary Johnson',
    'David Wilson',
    'Sarah Davis',
    'Michael Brown',
    'Jennifer White',
    'Robert Lee',
    'Susan Anderson',
    'Charles Harris',
    'Amanda Lewis',
    'Laura Roberts',
    'Robert Lee',
  ];
  uploadedCoursesAuthors: string[] = [
    'William Jackson',
    'Laura Roberts',
    'Richard Martin',
    'Lisa Miller',
  ];

  reviewCoursesText: string[] = [ 
  'Student | Crash Course', 
  'Beginner | Detailed Course', 
  'Intermediate | Crash Course', 
  'Student | Detailed Course',
  'Expert | Crash Course',
  'Student | Crash Course', 
  'Beginner | Crash Course',
  'Intermediate | Detailed Course',
  'Expert | Detailed Course', 
];

  uploadedCoursesText: string[] = [
  'Expert | Detailed Course', 
  'Beginner | Crash Course', 
  'Intermediate | Detailed Course', 
  'Student | Crash Course', 
  'Beginner | Detailed Course', 
  'Intermediate | Crash Course', 
  'Student | Detailed Course',
  'Expert | Crash Course',
  'Student | Crash Course', 
  'Beginner | Crash Course',
  'Intermediate | Detailed Course',
  'Expert | Detailed Course', 
];
  paragraphs: string[] = [
    'Government Structure Rules.',
    'Offenses and Punishments.',
    'Legal Court Processes.',
    'Agreement Enforcement Rules.',
    'Civil Wrong Remedies.',
    'Ownership Rights Regulation.',
    'Global Relations Laws.',
    'Domestic Relationship Regulations.',
    "Nature Protection Rules.",
    'Creative Rights Protection.',
    'Fundamental Freedom Safeguards.',
    'Business Entity Regulations.',
  ];

  uploadedparagraphs: string[] = [
    'Government Structure Rules.',
    'Offenses and Punishments.',
    'Legal Court Processes.',
    'Agreement Enforcement Rules.',
    'Civil Wrong Remedies.',
    'Ownership Rights Regulation.',
    'Global Relations Laws.',
    'Domestic Relationship Regulations.',
    "Nature Protection Rules.",
    'Creative Rights Protection.',
    'Fundamental Freedom Safeguards.',
    'Business Entity Regulations.',
  ];

  coursePrice = [
    3199, 3029, 3229, 3009, 3599, 3055, 3199, 3327, 3087, 3299, 3172, 3449,
  ];

  randomMyCourseValues: number[] = [];
  randomAvailableCourses: number[] = [];
  randomRejectedValues:number[]=[];
  randomuploadedValues:number[]=[];

  availableCousrseSubscribers: string[] = [];
  myCourseSubscribers: string[] = [];
  
  ngOnInit(): void {

    for (let i = 0; i < 2; i++) {
      const randomImageURL = `https://picsum.photos/300/200?random=${i}`;
      this.rejectedimages.push(randomImageURL);
      const randomValue = Math.floor(Math.random() * 100) + 1;
      this.randomRejectedValues.push(randomValue);
    }

    for (let i = 0; i < 4; i++) {
      const randomImageURL = `https://picsum.photos/300/200?random=${i}`;
      this.mycoursesimages.push(randomImageURL);
      const randomValue = Math.floor(Math.random() * 100) + 1;
      this.randomMyCourseValues.push(randomValue);

      const minHours = 1.5;
      const maxHours = 6;
      const hours = minHours + Math.random() * (maxHours - minHours);     
      const formattedHours = Math.floor(hours);
      const minutes = Math.floor((hours % 1) * 60);
      const formattedMinutes = this.formatWithLeadingZero(minutes);    
      const duration = `${formattedHours}h ${formattedMinutes}m`;
      this.uploadedCoursesDurations.push(duration);
    }

    for (let i = 0; i < 4; i++) {
      const randomImageURL = `https://picsum.photos/300/200?random=${i}`;
      this.uploadedimages.push(randomImageURL);
      const randomValue = Math.floor(Math.random() * 100) + 1;
      this.randomuploadedValues.push(randomValue);

      const minHours = 1.5;
      const maxHours = 6;
      const hours = minHours + Math.random() * (maxHours - minHours);     
      const formattedHours = Math.floor(hours);
      const minutes = Math.floor((hours % 1) * 60);
      const formattedMinutes = this.formatWithLeadingZero(minutes);    
      const duration = `${formattedHours}h ${formattedMinutes}m`;
      this.uploadedCoursesDurations.push(duration);
    }
  }

  formatWithLeadingZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
  constructor(private route: ActivatedRoute) { }
}
