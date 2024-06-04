import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { endPoints } from 'src/app/common/constants/endpoints';
import { ArticleformService } from '../articleform.service';
import { Article } from '../fetcharticle.model';
import { PdfService } from 'src/app/sharedService.service';
import { HttpClient } from '@angular/common/http';
import { Pagination } from 'src/app/common/models/pagination.model';

@Component({
  selector: 'app-sharedarticle-history',
  templateUrl: './sharedarticle-history.component.html',
  styleUrls: ['./sharedarticle-history.component.scss']
})
export class SharedarticleHistoryComponent implements OnInit {
  userArticles: Article[] = [];
  pagination: Pagination = new Pagination();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private articleformService: ArticleformService,
    private pdfService: PdfService,
    private http:HttpClient
  ) { }

  ngOnInit() {
    this.getUserArticles();
  }

  getUserArticles() {
  
    const apiUrl=endPoints.secureBaseURL + `/articles?page=${this.pagination.page}&size=${this.pagination.size}&sort=createdDate,desc`
    this.http.get<any>(apiUrl).subscribe(response => {
      const userArticles: Article[] = response.data.content;
      this.pagination = new Pagination(response.data);
      this.userArticles= userArticles;
    })
    
  }

  openArticle(article: any) {
    let currentUrl = this.router.url;
    let routePrefix = '';

    if (currentUrl.includes('subscriber')) {
      routePrefix = 'subscriber';
    } else if (currentUrl.includes('instructor')) {
      routePrefix = 'instructor';
    }
    const { id, reviewStatus } = article; // Extract id and reviewStatus from article object

    if (routePrefix === 'subscriber' && reviewStatus === 'ADMIN_RESUBMIT') {
     this.router.navigate([`${routePrefix}/articleform`, id]); // Redirect for instructor
  
     
    }  else if (routePrefix === 'instructor' && reviewStatus === 'ADMIN_RESUBMIT') {
      this.router.navigate([`${routePrefix}/articleform`, id]); // Redirect for instructor
    }
    else {
      this.router.navigate([`${routePrefix}/uploadedarticle`, id]);
    }
   
    
  }

  getArticleStatus(reviewStatus: string, deleted: boolean): string {
    if (deleted) {
      return "Deleted";
  } else {
    return this.pdfService.getArticleStatus(reviewStatus);
  }
}

  getStatusStyles(reviewStatus: string, deleted: boolean): any {
    if (deleted) {
      return { 'color': 'black' };
  } else {
    let color = '';
    switch (reviewStatus) {
      case 'SUBMITTED':
        color = 'blue';
        break;
      case 'ADMIN_ACCEPTED':
        color = 'green';
        break;
      case 'ADMIN_REJECTED':
        color = 'red';
        break;
      case 'ADMIN_RESUBMIT':
        color = '#eb7117';
        break;
      default:
        color = 'blue';
    }
    return { 'color': color };
  }
} 
  
  navigateToArticleForm(): void {
    const currentUrl = this.router.url;

    if (currentUrl.includes('/subscriber/article')) {
      this.router.navigateByUrl('/subscriber/articleform');
    } else if (currentUrl.includes('instructor/article')) {
      this.router.navigateByUrl('/instructor/articleform');
    }
  }
  
  onPageChange(pagination: Pagination) {
    this.pagination.page  = pagination.page;
    this.pagination.size  = pagination.size;
    this.getUserArticles()
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
