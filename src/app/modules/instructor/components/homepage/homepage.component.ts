import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Categories {
  viewValue: string;
}

@Component({
  selector: 'app-unique-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{

  title = 'my-first-app';
  categories: Categories[] = [
    { viewValue: 'Beginner' },
    { viewValue: 'Intermediate' },
    { viewValue: 'Expert' },
    { viewValue: 'Student' },
  ];


  rejectedimages:string[]=[];
  mycoursesimages: string[] = [];
  availablecoursesimages: string[] = [];
  
  j: number = 0; 

  isHovered: boolean[] = new Array(this.availablecoursesimages.length).fill(false);

  headings: string[] = [
    "Introduction to Criminal Law:",
    "Contract Law Demystified: ",
    "Environmental Law Explained: ",
    "Intellectual Property Law: Protecting Your Creative Works",
    "Civil Rights and Liberties: A Legal Perspective",
    "Family Law Fundamentals: Divorce, Child Custody, and Alimony",
    "Real Estate Law Made Simple: Buying, Selling, and Leasing Properties",
    "Business Law Essentials for Entrepreneurs and Small Businesses",
    "Human Rights Law: Protecting Dignity and Equality",
    "Labor and Employment Law: Rights and Responsibilities in the Workplace",
    "International Law and Diplomacy: A Global Perspective",
    "Torts and Personal Injury Law: Compensation for Harm",
    "Bankruptcy Law: Understanding the Financial Fresh Start",
    "Healthcare Law: Navigating Regulations in the Medical Field",
    "Immigration Law 101: Visas, Citizenship, and Asylum",
    "Estate Planning and Probate Law: Securing Your Legacy",
    "Cybersecurity and Privacy Law: Safeguarding Digital Assets",
    "Tax Law Essentials: Managing Taxation for Individuals and Businesses",
    "Criminal Procedure: Protecting Constitutional Rights in Court",
    "Administrative Law: Governing Government Agencies",
    "Business Law Essentials for Entrepreneurs and Small Businesses",
    "Torts and Personal Injury Law: Compensation for Harm",
  ];
  authors: string[] = [
    'John Smith',
    'Mary Johnson',
    'David Wilson',
    'Sarah Davis',
    'Michael Brown',
    'Jennifer White',
    'Robert Lee',
    'Susan Anderson',
    'William Jackson',
    'Laura Roberts',
    'Richard Martin',
    'Lisa Miller',
    'James Young',
    'Elizabeth Wilson',
    'Thomas Baker',
    'Patricia Moore',
    'Daniel Clark',
    'Linda Taylor',
    'Charles Harris',
    'Amanda Lewis',
    'Laura Roberts',
    'Robert Lee',
  ];
  randomMyCourseValues: number[] = [];
  randomAvailableCourses: number[] = [];
  randomSubscribersValues: number[] = [];
  randomRejectedValues:number[]=[];
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


  // category!: string;

  constructor(private route: ActivatedRoute) { }

  // ngOnInit(): void {
  //   // Get the category parameter from the route
  //   this.route.paramMap.subscribe(params => {
  //     this.category = params.get('category');
  //   });
  // }

}


