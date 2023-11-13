import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {

  videoGroups: any[] = new Array(15).fill(null).map((_, i) => ({
    panelTitle: `Section ${i + 1}`,
    videos: [
      {
        url: 'assets/video2.mp4',
        selected: false,
        title: 'Introduction',
        time: '1min',
      },
      {
        url: 'assets/video3.mp4',
        selected: false,
        title: 'Hands-On Practice',
        time: '9min',
      },
      {
        url: 'assets/video1.mp4',
        selected: false,
        title: "Let's get started",
        time: '2min',
      },
    ],
  }));
  availableCourse:boolean=false;
  sectionInfo: boolean[][] = new Array(this.videoGroups.length)
  .fill([])
  .map(() => []);
 

toggleSectionInfo(i: number, j: number) {
  this.sectionInfo[i][j] = !this.sectionInfo[i][j];
}
  instructor: {
    name: string;
    title: string;
    rating: number;
    bio: string;
  } = {
    name: 'John Doe',
    title: 'Web Development Instructor',
    rating: 4.5,
    bio: 'John Doe is a web development instructor with over 10 years of experience. He has a passion for teaching and helping others learn new skills. John is also a certified web developer and has a strong understanding of HTML, CSS, and JavaScript.'
  };
  
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.availableCourse = params['showDiv'] === 'true';
     
    });
  }
  submittedReview:boolean=false;
  showRating = false;
  stars = [1, 2, 3, 4, 5];
  selected = 0;
  userReview: string = '';
  isratingEditable:boolean=true;
  leaveRatingOpen() {
    this.showRating = true;
  }
  leaveRatingClose() {
    this.showRating = false;  
  }

  updaterating(r: any) {
    if(this.isratingEditable){
    this.selected = r;
    }
  }
  submitRating() {
    console.log('Selected Rating:', this.selected);
    console.log('User Review:', this.userReview);
    this.showRating = false;
    this.submittedReview=true
  }
  getStarArray(): number[] {
    return Array.from({ length: 5 }, (_, i) => i);
  }
  ratingClicked(i:any){
   this.isratingEditable=false;
  }
  
}

