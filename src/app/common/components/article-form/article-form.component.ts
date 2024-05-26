import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleformService } from '../../../shared-module/components/articleform.service'
import { endPoints } from 'src/app/common/constants/endpoints';
import { NotificationService } from '../../../common/services/notification/notification.service'
import { Article } from 'src/app/shared-module/components/fetcharticle.model';
import { AuthTokenService } from '../../services/auth-token/auth-token.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent {
  userArticles: Article | undefined;
  matchedArticle: any;
  userDetailsSubscription: any;
  name: string | undefined;
  displayform= true;
  articleForm: FormGroup;
  formData: FormData;
  userDetails: any; 
  isClicked = false;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private articleformService: ArticleformService,
    private notificationService: NotificationService,
    private authService: AuthTokenService
  ) {
    this.articleForm = this.fb.group({
      name: ['', Validators.required],
      articleName: [''],
      description: ['', Validators.required],
      file: [null, Validators.required]
    });
    this.formData = new FormData();
  }
  ngOnInit() {
    this.getUserArticles();
    this.userDetailsSubscription = this.authService.userDetails$.subscribe(
      (userDetails: UserModel | null) => {      
        this.name = userDetails?.name;
      }
    );
    
  }
  onFileUpload(event: any) {
    console.log(event.target.files);
    const files = event.target.files;
    if (files !== null && files.length > 0) {
      const file: File | null = files[0];
      if (file) {
        this.formData.append('file', file);
      }
    }
  }
  getUserArticles() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const id = +idParam;
    this.articleformService.get<any>(endPoints.baseURL + `/secure/articles`).subscribe(
      (response) => {
        this.userArticles = response.data.content || [];
        console.log(this.userArticles);

        if (Array.isArray(this.userArticles)) {
          // Find the article with the matching ID
          this.matchedArticle = this.userArticles.find((article: any) => article.id === id);
        }
         // Compare the IDs and log if they match

        // if (this.userArticles?.data.files && this.userArticles.data.files.length > 0) {
        //   this.openFile(this.userArticles?.data.files[0]?.url, this.userArticles?.data.files[0]?.fileName);
        // }
        
      },
      (error) => {
        console.error('Error submitting article:', error);
      }
    );}
    
  }
  onSubmit() {
    if (this.articleForm.valid) {
      this.isClicked = true;
      // Add individual fields to the 'articleBean' parameter
      this.formData.set('articleBean', new Blob([JSON.stringify({
        title: this.articleForm.get('name')!.value,
        author: this.articleForm.get('articleName')!.value,
        subject: this.articleForm.get('description')!.value,
        description: this.articleForm.get('description')!.value
      })], { type: 'application/json' }));
      // Make API request using the ApiService
      this.articleformService.post<any>(endPoints.baseURL + '/secure/articles', this.formData).subscribe(
        (response) => {
          console.log('Article submitted successfully:', response);
          this.displayform=false
        
          // this.router.navigate(['/subscriber/submitmesg']);
          setTimeout(() => {
            this.isClicked = false;
          }, 2000);
        },
        (error) => {
          console.error('Error submitting article:', error);
        }
      );
    }
  }
  navigateToSuccessMessage() {
    this.router.navigate(['/subscriber/submitmesg']);
  }
  closeMessage(): void {
    this.displayform=true;
    this.articleForm.reset();

  }
}

