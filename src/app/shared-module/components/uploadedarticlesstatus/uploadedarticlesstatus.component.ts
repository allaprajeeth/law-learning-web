import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/shared-module/components/fetcharticle.model';
import { ArticleformService } from 'src/app/shared-module/components/articleform.service';
import { endPoints } from 'src/app/common/constants/endpoints';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { PdfService } from 'src/app/sharedService.service';

@Component({
  selector: 'app-uploadedarticlesstatus',
  templateUrl: './uploadedarticlesstatus.component.html',
  styleUrls: ['./uploadedarticlesstatus.component.scss']
})
export class UploadedarticlesstatusComponent  implements OnInit{
  article: Article | undefined;
  storedFileContent: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleformService,
    private http: HttpClient,
    private location: Location,
    private pdfService: PdfService
  ) { }

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const id = +idParam;
      this.articleService.get<Article>(`${endPoints.baseURL}/articles/${id}`).subscribe({
        next: (article: Article) => {
          this.article = article;
          console.log("Article with id", article);
          
          if (this.article?.data.files && this.article.data.files.length > 0) {
            this.openFile(this.article?.data.files[0]?.url, this.article?.data.files[0]?.fileName);
          }
          
        },
        error: (error: any) => {
          console.error('Error fetching article:', error);
        }
      });
    } else {
      console.error('Article ID is null');
    }
  }

  openFile(fileUrl?: string, fileName?: string): void {
    this.http.get(endPoints.baseURL + `/downloadFile?path=${fileUrl}`, { responseType: 'text' })
      .subscribe(
        (data: string) => {
          this.storedFileContent = data;
        },
        (error) => {
          console.error('Error downloading file:', error);
        }
      );
  }
  
  goBack() {
    this.location.back();
  }

  getArticleStatus(reviewStatus: string): string {
    return this.pdfService.getArticleStatus(reviewStatus);
  }

}
