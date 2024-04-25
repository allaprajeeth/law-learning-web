import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/shared-module/components/fetcharticle.model';
import { ArticleformService } from 'src/app/shared-module/components/articleform.service';
import { endPoints } from 'src/app/common/constants/endpoints';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { PdfService } from 'src/app/sharedService.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-uploadedarticlesstatus',
  templateUrl: './uploadedarticlesstatus.component.html',
  styleUrls: ['./uploadedarticlesstatus.component.scss']
})
export class UploadedarticlesstatusComponent  implements OnInit{
  article: Article | undefined;
  storedFileContent: string | undefined;
  articleId :number | undefined
  officeViewerSrc: SafeResourceUrl | string | undefined;
  fileOpened: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleformService,
    private http: HttpClient,
    private location: Location,
    private pdfService: PdfService,
    private sanitizer: DomSanitizer,
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
    if (fileUrl) {
      const downloadUrl =  endPoints.s3BaseURL + fileUrl;
      console.log(fileUrl)
  
        const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(downloadUrl)}`;
        const safeUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(officeViewerUrl);
        this.officeViewerSrc = safeUrl;
        this.fileOpened = true;
    } else {
        console.error('File URL is undefined.');
    }
  }
  
  goBack() {
    this.location.back();
  }

  getArticleStatus(reviewStatus: string): string {
    return this.pdfService.getArticleStatus(reviewStatus);
  }

}
