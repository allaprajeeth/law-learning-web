// article-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetcharticlesService } from 'src/app/shared-module/components/fetcharticles.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent {
//   articleId: number | undefined;
//   article: any; // Adjust the type based on your actual structure

//   constructor(
//     private fetcharticleService: FetcharticlesService,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.articleId = +params['id'];
//       this.fetchArticleDetail();
//     });
//   }

//   fetchArticleDetail(): void {
//     // Call your service to get the article detail based on the articleId
//     // Example: this.fetcharticleService.getArticleDetail(this.articleId).subscribe((article) => this.article = article);
//   }
}
