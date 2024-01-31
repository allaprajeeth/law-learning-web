// article-detail.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';
import { FileSaverService } from 'ngx-filesaver';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  article: Article | undefined;
  fileOpened: boolean = false;
  approvalStatus: 'approved' | 'rejected' | 'pending' = 'pending';
  
  constructor(
    private route: ActivatedRoute,
    public articleService: ArticleService,
    private router: Router,
    private fileSaverService: FileSaverService,
    private cdr: ChangeDetectorRef,
   
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const articleId = +params.get('id')!;
      const fileId = params.get('fileId');

      const storedArticleDetails = localStorage.getItem('articleDetails');
      this.article = storedArticleDetails ? JSON.parse(storedArticleDetails) : undefined;


      // If not found in local storage, fetch from the service and store it
      if (!this.article) {
        this.article = this.articleService.getSelectedArticle();
        // Store article details in local storage
        localStorage.setItem('articleDetails', JSON.stringify(this.article));
      }
    
    });

   
    
  }
  

  openFile(fileUrl?: string, fileName?: string): void {
    if (fileUrl) {

       // Construct the download URL with the fileUrl
       const downloadUrl = `http://192.168.1.42:8080/api/v1/downloadFile?path=${fileUrl}`;


      // Open the file directly
      // this.fileOpened = true;

      console.log('File URL:', fileUrl);
      console.log('Opening file:', fileName);
      // window.open(fileUrl, '_blank');
      window.open(downloadUrl, '_blank');
      // realines
    } else {
      console.error('File URL is undefined.');
    }

   
  }


 
  ngOnDestroy(): void {
    // Clear article details from local storage when leaving the component
    localStorage.removeItem('articleDetails');
  }


  goBack(): void {
    this.router.navigate(['/authentication/homepage']);
  }

  approveArticle(): void {
    // Additional logic for article approval goes here
    // For now, let's just update the approvalStatus
    this.approvalStatus = 'approved';
  }

  rejectArticle(): void {
    // Additional logic for article rejection goes here
    // For now, let's just update the approvalStatus
    this.approvalStatus = 'rejected';
  }
  closeMessage(): void {
    this.approvalStatus = 'pending'; // Reset approval status to hide the message
  }
}