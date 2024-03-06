import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewerRoutingModule } from './reviewer-routing.module';
import { ReviewerLoginComponent } from './components/reviewer-login/reviewer-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReviewernavComponent } from './components/reviewernav/reviewernav.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ReviewervideoComponent } from './components/reviewervideo/reviewervideo.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ArticleComponent } from './components/article/article.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { TermsandcondiComponent } from './components/termsandcondi/termsandcondi.component';
import { LibraryReviewerComponent } from './components/library-reviewer/library-reviewer.component';
import { ArticleformComponent } from './components/articleform/articleform.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AccountsecurityComponent } from './components/accountsecurity/accountsecurity.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { DeleteaccountComponent } from './components/deleteaccount/deleteaccount.component';
import { PhotoComponent } from './components/photo/photo.component';
import { UploadStatusComponent } from './components/upload-status/upload-status.component';
import { ArticleHistoryComponent } from './components/article-history/article-history.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ReviewerPostdetailsComponent } from './components/reviewer-postdetails/reviewer-postdetails.component';

@NgModule({
  declarations: [
    ReviewerLoginComponent,
    ReviewernavComponent,
    HomepageComponent,
    ReviewervideoComponent,
    NotificationComponent,
    ArticleComponent,
    CourseInfoComponent,
    TermsandcondiComponent,
    LibraryReviewerComponent,
    ArticleformComponent,
    AccountsecurityComponent,
    SidenavComponent,
    NotificationsComponent,
    ContactusComponent,
    DeleteaccountComponent,
    PhotoComponent,
    UploadStatusComponent,
    ArticleHistoryComponent,
    ArticleDetailComponent,
    ReviewerPostdetailsComponent,
  ],

  imports: [
    CommonModule,
    ReviewerRoutingModule,
    SharedModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatBadgeModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule

  ]
})
export class ReviewerModule { }
