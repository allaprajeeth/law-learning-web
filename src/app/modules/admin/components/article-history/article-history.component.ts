import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Article } from '../admin.model';
import { Pagination } from 'src/app/common/models/pagination.model';
import { endPoints } from 'src/app/common/constants/endpoints';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-article-history',
  templateUrl: './article-history.component.html',
  styleUrls: ['./article-history.component.scss'],
})
export class ArticleHistoryComponent implements OnInit {
  approvedArticles: Article[] = [];
  pagination: Pagination = new Pagination();
  constructor(private adminService: AdminService ,private http:HttpClient) {}

  ngOnInit(): void {
    this.getApprovedArticles();
  }

  getApprovedArticles(): void {
    const apiUrl =`${endPoints.baseURL}/secure/articles/review`;
    const paginationParams = this.pagination.getPaginationRequest();
    const queryParams = { ...paginationParams };
    this.http.get<any>(apiUrl, { params: queryParams }).subscribe(response => {
      const approvedArticles:Article[] = response.data.content;
      this.pagination = new Pagination(response.data);
      this.approvedArticles =approvedArticles;
    
      },
      (error) => {
        console.error('Error fetching approved articles:', error);
      }
    );
  }
  onPageChange(pagination: Pagination) {
    this.pagination.page  = pagination.page;
    this.pagination.size  = pagination.size;
    this.getApprovedArticles()
  }
}
