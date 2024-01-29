import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FilterByCategoryService } from '../filter-by-category.service';



interface Categories {
  viewValue: string;
}
interface PdfFile {
  name: string;
  url: string;
}

interface articleFile {
  name: string;
  url: string;
}
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  
})
export class HomepageComponent implements OnInit{
  selectedFilter: string = 'all';
  filteredArticles: any[] = []; 

  coursesFilter: string = ''; 
  libraryFilter: string = ''; 
  publishingCornerFilter: string = ''; 


  // categories: Categories[] = [
  //   { viewValue: 'Beginner' },
  //   { viewValue: 'Intermediate' },
  //   { viewValue: 'Expert' },
  //   { viewValue: 'Student' },
  // ];


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

  allArticles: any[] = [/* your array of articles */];
  contentManagerArticles: any[] = [];
  reviewerArticles: any[] = [];
  uploadedArticles: any[] = [];

  
  ngOnInit(): void {

    // Initialize your data and other logic here
    // For example:
    this.allArticles = [
      { name: 'Intellectual Property Trends', category: 'contentManager' },
      { name: 'Constitutional Challenges Today', category: 'contentManager' },
      { name: 'Ethics in Criminal Defense', category: 'reviewer' },
      { name: 'Global Human Rights Updates', icon: 'path/to/icon4.png', url: 'path/to/document4.pdf', category: 'uploadedArticles'},
      { name: 'Global Human Rights Updates', icon: 'path/to/icon4.png', url: 'path/to/document4.pdf', category: 'uploadedArticles'},
      { name: 'Global Human Rights Updates', icon: 'path/to/icon4.png', url: 'path/to/document4.pdf', category: 'uploadedArticles'},
     
    ];

    // reviewarticles: { name: string; icon: string; url: string; category: string }[] = [
    //   { name: 'Intellectual Property Trends', icon: 'path/to/icon1.png', url: 'path/to/document1.pdf',  category: 'contentManager' },
    //   { name: 'Constitutional Challenges Today', icon: 'path/to/icon2.png', url: 'path/to/document2.pdf', category: 'reviewer' },
    //   { name: 'Ethics in Criminal Defense', icon: 'path/to/icon3.png', url: 'path/to/document3.pdf',  category: 'reviewer'},
    //   { name: 'Global Human Rights Updates', icon: 'path/to/icon4.png', url: 'path/to/document4.pdf', category: 'reviewer'},
    //   { name: 'Global Human Rights Updates', icon: 'path/to/icon4.png', url: 'path/to/document4.pdf', category: 'uploadedCourses'},
    //   { name: 'Global Human Rights Updates', icon: 'path/to/icon4.png', url: 'path/to/document4.pdf', category: 'uploadedCourses'},
     
      
    // ];

    this.filteredArticles = [...this.allArticles];

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
  constructor(private route: ActivatedRoute, private router:Router, private filterService:FilterByCategoryService)
   {   

   
   {
    // Filter articles based on categories
    this.contentManagerArticles = this.allArticles.filter(
      (article) => article.category === 'contentManager'
    );
    this.reviewerArticles = this.allArticles.filter(
      (article) => article.category === 'reviewer'
    );
    this.uploadedArticles = this.allArticles.filter(
      (article) => article.category === 'uploadedCourses'
    );
  }
 }

  

  reviewpdfs = [
    { name: 'Human Rights Law and Theory', icon: 'path/to/icon1.png', url: 'path/to/document1.pdf' },
    { name: 'Intellectual Property Rights', icon: 'path/to/icon2.png', url: 'path/to/document2.pdf' },
    { name: 'Banking and Insurance Law', icon: 'path/to/icon3.png', url: 'path/to/document3.pdf' },
    { name: 'Constitutional Law I', icon: 'path/to/icon4.png', url: 'path/to/document4.pdf' },
    { name: 'Constitutional Law I', icon: 'path/to/icon4.png', url: 'path/to/document4.pdf' },
    { name: 'Constitutional Law I', icon: 'path/to/icon4.png', url: 'path/to/document4.pdf' },
  ];

  filterArticles(): void {
    if (this.selectedFilter === 'all') {
      this.filteredArticles = [...this.allArticles];
    } else {
      this.filteredArticles = this.filterService.filterByCategory(this.allArticles, this.selectedFilter);
    }
  }
  filteredImages() {
    switch (this.coursesFilter) {
      case 'All':
        return this.mycoursesimages;
      case 'contentManager':
        return this.mycoursesimages.slice(0, 3);
      case 'reviewer':
        return this.mycoursesimages.slice(0, 2);
      case 'uploadedCourses':
        return this.mycoursesimages.slice(0, 1); // Keep all images for 'uploadedCourses'
      default:
        return this.mycoursesimages;
    }
  }
  // Assuming you have an array of PDFs, e.g., reviewpdfs
filteredPDFs() {
  switch (this.libraryFilter) {
    case 'All':
      return this.reviewpdfs; // Display all PDFs if no filter is selected
    case 'contentManager':
      return this.reviewpdfs.slice(0, 3); // Display the first 3 PDFs for 'contentManager'
    case 'reviewer':
      return this.reviewpdfs.slice(0, 4); // Display the first 2 PDFs for 'reviewer'
    case 'uploadedCourses':
      return this.reviewpdfs.slice(0, 5); // Display all PDFs for 'uploadedCourses'
    default:
      return this.reviewpdfs; // Display all PDFs if no filter is selected
  }
}
  
}




  // reviewedpdfs = [
  //   { name: 'Law of Contract Explanation', icon: 'path/to/icon1.png', url: 'path/to/document1.pdf' },
  //   { name: 'Labour and Industrial Law', icon: 'path/to/icon2.png', url: 'path/to/document2.pdf' },
  //   { name: 'Constitutional Law I', icon: 'path/to/icon4.png', url: 'path/to/document4.pdf' },
  //   { name: 'Public International Law', icon: 'path/to/icon6.png', url: 'path/to/document6.pdf' },
  // ];

  // pdfFiles: PdfFile[] = [
  //   {
  //     name: "Introduction to law and Legal Reasoning",
  //     url:"https://www.law.berkeley.edu/wp-content/uploads/2017/11/CommonLawCivilLawTraditions.pdf"
  //   },
  //   {
  //     name: "The Six Laws of Learning",
  //     url: "https://medicine.hofstra.edu/pdf/faculty/facdev/facdev_sixlaws_oflearning.pdf"
  //   },
  //   {
  //     name: "The Book in Legal Education",
  //     url: "https://openyls.law.yale.edu/bitstream/handle/20.500.13051/178/Learning_the_Law_catalog__reduced.pdf?sequence=2&isAllowed=y"
  //   },
  // {
  //   name:"Law and Legal Reasoning Explanation",
  //   url:"https://www.lawspice.com/webresources/webworld/pdf/Futura%20BK%20BT.pdf"
  // },
  // {
  //   name:"The Common Law and Civil Law",
  //   url:"https://www.uncfsu.edu/assets/Documents/College%20of%20Business%20and%20Economics/legal.pdf"
  // },
  // {
  //   name:"Legal Education Explanation",
  //   url:"https://openyls.law.yale.edu/bitstream/handle/20.500.13051/178/Learning_the_Law_catalog__reduced.pdf?sequence=2&isAllowed=y"
  // },
  // {
  //   name:"The Book in Early Legal Education",
  //   url:"https://www.lawspice.com/webresources/webworld/pdf/Futura%20BK%20BT.pdf"
  // },
  // {
  //   name:"The Common Law and Civil Law Traditions",
  //   url:"https://www.law.berkeley.edu/wp-content/uploads/2017/11/CommonLawCivilLawTraditions.pdf"
  // },
  // ];


  // openFile(pdfFileIndex: number): void {
  //   const selectedPdf = this.pdfFiles[pdfFileIndex];
  //   this.router.navigate(['/pdf-viewer'], { queryParams: { src: selectedPdf.url } });
    
  // }

  

  
 
// categories: Categories[] = [
//   { viewValue: 'All' },
//   { viewValue: 'Content-Manager' },
//   { viewValue: 'Reviewer' },
//   { viewValue: 'Uploaded-courses' },
// ];

//   courses: Course[] = [
//     {
//       image: 'https://www.osgu.ac.in/wp-content/uploads/2020/07/law-courses-subjects-eligibility-careers-jobs-benefits.jpg',
//       heading: 'Course 1',
//       author: 'Author 1',
//       text: 'Description of Course 1',
//       duration: '1h 30m',
//       category: 'Content-Manager',
//     },
//     {
//       image: 'path-to-image-2',
//       heading: 'Course 3',
//       author: 'Author 3',
//       text: 'Description of Course 1',
//       duration: '1h 30m',
//       category: 'Content-Manager',
//     },
//     {
//       image: 'path-to-image-3',
//       heading: 'Course 4',
//       author: 'Author 4',
//       text: 'Description of Course 1',
//       duration: '1h 30m',
//       category: 'Reviewer',
//     },
//     {
//       image: 'path-to-image-4',
//       heading: 'Course 5',
//       author: 'Author 5',
//       text: 'Description of Course 1',
//       duration: '1h 30m',
//       category: 'Uploaded-courses',
//     },

   
//   ];



