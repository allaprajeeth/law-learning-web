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
  selectedFilter: string = ''; // Property to store the selected filter option


  // contentManagerFilter: boolean = false;
  // reviewerFilter: boolean = false;
  // uploadingFilter: boolean = false;

  categories: Categories[] = [
    { viewValue: 'Beginner' },
    { viewValue: 'Intermediate' },
    { viewValue: 'Expert' },
    { viewValue: 'Student' },
  ];


  rejectedimages:string[]=[];
  mycoursesimages: string[] = [];
  availablecoursesimages: string[] = [];

  subscribersValues = ["10", "50", "100", "200", "500", "1000"];

  uploadedCoursesDurations: string[] = [];
  availableCoursesDurations: string[] = [];
  // uploadedCoursesDurations: string[] = [];
  rejectedCoursesDurations: string[] = [];
  myCoursesDurations: string[] = [];
  // availableCoursesDurations: string[] = [];

  availableCourseSubscribers: string[] = [];
  
  j: number = 0; 

  isHovered: boolean[] = new Array(this.availablecoursesimages.length).fill(false);

  myCoursesHeadings: string[] = [
    "Bankruptcy Law",
    "Healthcare Law",
    "Immigration Law 101",
    "Estate Planning and Probate Law",
  ];

  uploadedCoursesHeadings: string[] = [
    "Cybersecurity and Privacy Law",
    "Tax Law Essentials",
    "Criminal Procedure",
    "Administrative Law",
  ];

  availableCoursesHeadings: string[] = [
    "Introduction to Criminal Law",
    "Contract Law Demystified",
    "Environmental Law Explained",
    "Intellectual Property Law",
    "Civil Rights and Liberties",
    "Family Law Fundamentals",
    "Real Estate Law Made Simple",
    "Business Law Essentials for Entrepreneurs",
    "Human Rights Law",
    "Labor and Employment Law",
    "International Law and Diplomacy",
    "Torts and Personal Injury Law",
  ];
myCoursesAuthors: string[] = [
    'William Jackson',
    'Laura Roberts',
    'Richard Martin',
    'Lisa Miller',
  ];

  myCoursesText: string[] = [
    'Expert | Detailed Course', 
    'Student | Crash Course', 
    'Beginner | Crash Course', 
    'Intermediate | Detailed Course',
  ];
  uploadedCoursesAuthors: string[] = [
    'James Young',
    'Elizabeth Wilson',
    'Thomas Baker',
    'Patricia Moore',
  ];

  availableCoursesAuthors: string[] = [
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

uploadedCoursesText: string[] = [
  'Expert | Detailed Course', 
  'Beginner | Crash Course', 
  'Intermediate | Detailed Course', 
  'Student | Crash Course',
];

availableCoursesText: string[] = [
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

  randomMyCourseValues: number[] = [];
  randomAvailableCourses: number[] = [];
  // randomSubscribersValues: number[] = [];


  randomRejectedValues:number[]=[];

  // subscribersValues = ["10", "50", "100", "200", "500", "1000"];

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

    for (let j = 0; j < 12; j++) {
      const randomImageURL = `https://picsum.photos/300/200?random=${j}`;
      this.availablecoursesimages.push(randomImageURL);
      const randomValue = Math.floor(Math.random() * 100) + 1;
      this.randomAvailableCourses.push(randomValue);
      const randomSubscribersIndex = Math.floor(Math.random() * this.subscribersValues.length);
      this.availableCousrseSubscribers.push(this.subscribersValues[randomSubscribersIndex]);

      const minHours = 1.5;
      const maxHours = 6;
      const hours = minHours + Math.random() * (maxHours - minHours);     
      const formattedHours = Math.floor(hours);
      const minutes = Math.floor((hours % 1) * 60);
      const formattedMinutes = this.formatWithLeadingZero(minutes);    
      const duration = `${formattedHours}h ${formattedMinutes}m`;
      this.availableCoursesDurations.push(duration);
    }
  }

  formatWithLeadingZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  constructor(private route: ActivatedRoute) { }


}
