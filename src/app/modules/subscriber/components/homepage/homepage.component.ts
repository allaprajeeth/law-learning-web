import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UniqueIdService } from '../unique-id.service';
import { CartService } from '../cart.service';
// import { SearchServiceService } from 'src/app/search.service.service';

interface Categories {
  viewValue: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  // @ViewChild('tooltipRef', { read: ElementRef })
  // tooltipEl!: ElementRef;

  uniqueIds: string[] = [];
  coursePrice: number[];

  // private uniqueIdCounter = 1;

  // generateUniqueId(): string {
  //   const uniqueId = `product_${this.uniqueIdCounter}`;
  //   this.uniqueIdCounter++;
  //   console.log(uniqueId);
  //   return uniqueId;
  // }

  mycoursesimages: string[] = [];
  availablecoursesimages: string[] = [];

  title = 'my-first-app';
  categories: Categories[] = [
    { viewValue: 'Beginner' },
    { viewValue: 'Intermediate' },
    { viewValue: 'Expert' },
    { viewValue: 'Student' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    public uniqueIdService: UniqueIdService
  ) // private searchService: SearchServiceService
  {
    // Initialize uniqueIds only if it hasn't been initialized
    if (uniqueIdService.uniqueIds.length === 0) {
      uniqueIdService.generateUniqueIds(this.availablecoursesimages.length);
    }

    this.coursePrice = [
      3199, 3029, 3229, 3009, 3599, 3055, 3199, 3327, 3087, 3299, 3172, 3449,
    ];
  }

  addToCartClicked(j: number) {
    // Generate a unique ID for the product
    // const uniqueId = this.uniqueIdService.generateUniqueIds(this.availablecoursesimages.length);

    // Create the product with a unique ID
    const product = {
      id: j,
      image: this.availablecoursesimages[j],
      heading: this.availableCoursesHeadings[j],
      coursesText: this.availableCoursesText[j],
      duration: this.availableCoursesDurations[j],
      price: this.coursePrice[j],
    };

    // Call the service to add the product to the cart
    this.cartService.addToCart(product);
    this.router.navigate(['/cart']);
  }

  availableCoursesHeadings: string[] = [
    'Introduction to Criminal Law',
    'Contract Law Demystified',
    'Environmental Law Explained',
    'Intellectual Property Law',
    'Civil Rights and Liberties',
    'Family Law Fundamentals',
    'Real Estate Law Made Simple',
    'Business Law Essentials for Entrepreneurs',
    'Human Rights Law',
    'Labor and Employment Law',
    'International Law and Diplomacy',
    'Torts and Personal Injury Law',
  ];

  myCoursesHeadings: string[] = [
    'Bankruptcy Law',
    'Healthcare Law',
    'Immigration Law 101',
    'Estate Planning and Probate Law',
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

  myCoursesAuthors: string[] = [
    'William Jackson',
    'Laura Roberts',
    'Richard Martin',
    'Lisa Miller',
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

  showCard: boolean[] = Array(12).fill(false);

  tooltipPosition: {
    left: string;
    right: string;
    top: string;
    display: string;
  } = { left: '0', right: 'unset', top: '0', display: 'none' };

  uploadedCoursesDurations: string[] = [];
  availableCoursesDurations: string[] = [];

  randomMyCourseValues: number[] = [];

  subscribersValues = ['10', '10', '50', '100', '200', '500', '1000'];

  myCourseSubscribers: string[] = [];
  availableCourseSubscribers: string[] = [];

  openMyMenu(event: MouseEvent, index: number): void {
    this.showCard = this.showCard.map((_, j) => j === index);

    // console.log("this.tooltipEl", this.tooltipEl);

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

        const courseCardPosition = { top: '-40px', right: '262px' };
        Object.assign(this.tooltipPosition, courseCardPosition);
      } else {
        this.tooltipPosition = {
          left: `${rect.left}px`,
          right: 'unset',
          top: `${rect.top}px`,
          display: 'block',
        };

        const courseCardPosition = { top: '-40px', left: '261px' };
        Object.assign(this.tooltipPosition, courseCardPosition);
      }
    }
  }

  closeMyMenu(index: number): void {
    this.showCard[index] = false;
  }

  ngOnInit(): void {
    // this.searchService.searchQuery$.subscribe((query) => {
    //   // this.searchQuery = query;
    //   this.filterImages();
    // });

    if (this.uniqueIdService.uniqueIds.length === 0) {
      this.uniqueIdService.generateUniqueIds(
        this.availablecoursesimages.length
      );
    }

    for (let i = 0; i < 4; i++) {
      const randomImageURL = `https://picsum.photos/300/200?random=${i}`;
      this.mycoursesimages.push(randomImageURL);
      const randomValue = Math.floor(Math.random() * 100) + 1;
      this.randomMyCourseValues.push(randomValue);
      const randomSubscribersIndex = Math.floor(
        Math.random() * this.subscribersValues.length
      );
      this.myCourseSubscribers.push(
        this.subscribersValues[randomSubscribersIndex]
      );

      const minHours = 1.5;
      const maxHours = 6;
      const hours = minHours + Math.random() * (maxHours - minHours);
      const formattedHours = Math.floor(hours);
      const minutes = Math.floor((hours % 1) * 60);
      const formattedMinutes = this.formatWithLeadingZero(minutes);
      const duration = `${formattedHours}h ${formattedMinutes}m`;
      this.uploadedCoursesDurations.push(duration);
    }

    for (let l = 0; l < 12; l++) {
      const randomImageURL = `https://picsum.photos/300/200?random=${l}`;
      this.availablecoursesimages.push(randomImageURL);
      const randomSubscribersIndex = Math.floor(
        Math.random() * this.subscribersValues.length
      );
      this.availableCourseSubscribers.push(
        this.subscribersValues[randomSubscribersIndex]
      );

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
}
