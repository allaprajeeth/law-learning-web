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
  closeArticle(): void {
    this.router.navigate(['/articleHistory']);
  }
}

