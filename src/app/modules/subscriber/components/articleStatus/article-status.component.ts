import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleStatusDataService } from '../article-status-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-status',
  templateUrl: './article-status.component.html',
  styleUrls: ['./article-status.component.scss'],
})

export class ArticleStatusComponent implements OnInit {
  articleData: any;
  status: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private articleStatusDataService: ArticleStatusDataService) {}

  ngOnInit(): void {
    this.articleData = this.articleStatusDataService.getData();
    const statusFromRoute = this.route.snapshot.paramMap.get('status');
    this.status = statusFromRoute !== null ? statusFromRoute : '';
  }

  closeArticle(): void {
    this.router.navigate(['/subscriber/articleHistory']);
  }
}

