import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleStatusDataService } from '../article-status-data.service';

@Component({
  selector: 'app-article-status',
  templateUrl: './article-status.component.html',
  styleUrls: ['./article-status.component.scss'],
})
export class ArticleStatusComponent implements OnInit {
  articleData: any;

  constructor(private router: Router, private articleStatusDataService: ArticleStatusDataService) {}

  ngOnInit(): void {
    this.articleData = this.articleStatusDataService.getData();

    if (!this.articleData) {
      this.router.navigate(['/articleHistory']);
    }
  }

  getRandomValue(): any {
    const adminNames = ['John Doe', 'Alice Smith', 'Bob Johnson', 'Emily Davis'];
    const contentManagerNames = ['Jane Doe', 'Charlie Brown', 'Eva Martinez', 'Daniel Lee'];
    const reviewerNames = ['David Johnson', 'Sarah Smith', 'Michael Brown', 'Jessica Davis'];
  
    if (this.articleData.status === 'Under Review') {
      const shuffledAdminNames = this.shuffleArray(adminNames);
      const approvedByAdmin = shuffledAdminNames.pop() || '';
  
      const shuffledContentManagerNames = this.shuffleArray(contentManagerNames);
      const approvedByContentManager = shuffledContentManagerNames.pop() || '';
  
      const shuffledReviewerNames = this.shuffleArray(reviewerNames);
      const approvedByReviewer = shuffledReviewerNames.pop() || '';
  
      // Randomly choose one of the values to be blank(-)
      const blankIndex = Math.floor(Math.random() * 3); // 0, 1, or 2
  
      let assignedValues: any = {
        approvedByAdmin: approvedByAdmin,
        approvedByContentManager: approvedByContentManager,
        approvedByReviewer: approvedByReviewer,
      };
  
      // If all three fields are blank, replace any one field with 'Sarah Smith'
      if (assignedValues.approvedByAdmin === '-' && assignedValues.approvedByContentManager === '-' && assignedValues.approvedByReviewer === '-') {
        const replaceIndex = Math.floor(Math.random() * 3); // 0, 1, or 2
        if (replaceIndex === 0) {
          assignedValues.approvedByAdmin = 'Sarah Smith';
        } else if (replaceIndex === 1) {
          assignedValues.approvedByContentManager = 'Sarah Smith';
        } else {
          assignedValues.approvedByReviewer = 'Sarah Smith';
        }
      }
  
      return assignedValues;
    }
  }   

  shuffleArray(array: string[]): string[] {
    // Shuffle the array to randomize the order
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  closeArticle(): void {
    this.router.navigate(['/articleHistory']);
  }
}
