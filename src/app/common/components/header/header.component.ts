import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Categories {
  viewValue: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  categories: Categories[] = [
    { viewValue: 'Beginner' },
    { viewValue: 'Intermediate' },
    { viewValue: 'Expert' },
    { viewValue: 'Student' },
  ];

  mycoursesimages: string[] = [];
  availablecoursesimages: string[] = [];

  j: number = 0; 

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
  randomSubscribersValues: number[] = [];

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
      this.randomSubscribersValues.push(randomSubscribers);
    }
  }



  constructor(private route: ActivatedRoute) { }





  
  }
  

















  


  