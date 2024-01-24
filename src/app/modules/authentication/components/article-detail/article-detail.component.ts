// article-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';
import { FileSaverService } from 'ngx-filesaver';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {

  articleId!: number;
  fileContent: string | undefined;
  article: Article | undefined;
  fileOpened: boolean = false;
  storedFileContent: string | undefined;

  constructor(
    private route: ActivatedRoute,
    public articleService: ArticleService,
    private router: Router,
    private fileSaverService: FileSaverService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.articleId = +params.get('id')!;
      const fileId = params.get('fileId');
      this.article = this.articleService.getSelectedArticle();
      console.log('Articles in article-detail:', this.article);
  
      if (this.articleId !== undefined) {
        // Only load file content if articleId is defined
        this.loadFileContent();
      }
    });
  }
  

  // loadFileContent(): void {
  //   this.articleService.getArticleFileContent(this.articleId).subscribe(
  //     (fileContent: string) => {
  //       this.fileContent = fileContent;
  //     },
  //     (error) => {
  //       console.error('Error fetching file content:', error);
  //     }
  //   );
  // }
  loadFileContent(): void {
    const fileEndpoint = 'file'; // Replace with your actual variable
    this.articleService.getArticleFileContent(this.articleId, fileEndpoint).subscribe(
      (fileContent: string) => {
        console.log('File Content:', fileContent);
        this.storedFileContent = fileContent;
      },
      (error) => {
        console.error('Error fetching file content:', error);
      }
    );
  }
  
  

  openFile(fileUrl?: string, fileName?: string): void {
    if (fileUrl) {
      // Open the file directly
      this.fileOpened = true;
  
      console.log('File URL:', fileUrl);
      console.log('Opening file:', fileName);
  
      // Use the articleId if defined, otherwise use a default value (e.g., 0)
      const articleId = this.articleId !== undefined ? this.articleId : 0;
      
  
      if (articleId !== 0) {
        const fileEndpoint = 'file'; // Replace with your actual variable
        // Only read and store file content if articleId is not 0 (or another default value)
        this.readAndStoreFileContent(articleId, fileEndpoint);
      }
  
      window.open(fileUrl, '_blank');
      // realines
    } else {
      console.error('File URL is undefined.');
    }
  }
  
  

  readAndStoreFileContent(articleId: number, fileEndpoint: string): void {
    this.articleService.getArticleFileContent(articleId, fileEndpoint).subscribe(
      (fileContent: string) => {
        console.log('File Content:', fileContent);
        this.storedFileContent = fileContent;
      },
      (error) => {
        console.error('Error fetching file content:', error);
      }
    );
  }
  
  // }


 



  goBack(): void {
    this.router.navigate(['/authentication/homepage']);
  }
}
