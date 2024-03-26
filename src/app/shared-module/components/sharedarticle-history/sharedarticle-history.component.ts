import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { endPoints } from 'src/app/common/constants/endpoints';
import { ArticleformService } from '../articleform.service';
import { NotificationService } from '../../../common/services/notification/notification.service'
import { Article } from '../fetcharticle.model';
@Component({
  selector: 'app-sharedarticle-history',
  templateUrl: './sharedarticle-history.component.html',
  styleUrls: ['./sharedarticle-history.component.scss']
})
export class SharedarticleHistoryComponent {
  userArticles: Article[] = [];
  constructor(private router: Router,
    private articleformService: ArticleformService,
  ) { }

  ngOnInit() {
    this.getUserAricles();
  }


  getUserAricles() {
    this.articleformService.get<any>(endPoints.baseURL + '/secure/articles').subscribe(
      (response) => {
        this.userArticles = response.data.content || [];
        console.log(this.userArticles)
      },
      (error) => {
        console.error('Error submitting article:', error);
      }
    )

  }
  getArticleStatus(reviewStatus: string): string {
    if (reviewStatus === 'SUBMITTED') {
      return 'Submitted';
    } else if (reviewStatus.includes('ADMIN_ACCEPTED')) {
      return 'Accepted';
    } else if (reviewStatus.includes('ADMIN_REJECTED')) {
      return 'Rejected';
    } else if (reviewStatus.includes('ADMIN_RESUBMITTED')) {
      return 'Re-Submitted';
    } else {
      return 'Under Review';
    }
  }


}