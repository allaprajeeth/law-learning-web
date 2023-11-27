import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleHistoryDataService } from '../article-history-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})

export class StatusComponent implements OnInit {
  articleData: any;
  status: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleHistoryDataService: ArticleHistoryDataService
  ) {}
  

  ngOnInit(): void {
    console.log('StatusComponent - ngOnInit');
    
    this.articleData = this.articleHistoryDataService.getData();
    const statusFromRoute = this.route.snapshot.paramMap.get('status');
    // this.status = statusFromRoute !== null ? statusFromRoute : '';

  // console.log('Received data:', this.articleData, this.status);
  }

  closeArticle(): void {
    this.router.navigate(['/articlehistory']);
  }
}

