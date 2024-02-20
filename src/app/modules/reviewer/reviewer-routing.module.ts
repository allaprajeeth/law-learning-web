import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewerLoginComponent } from './components/reviewer-login/reviewer-login.component';
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ReviewervideoComponent } from './components/reviewervideo/reviewervideo.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ArticleComponent } from './components/article/article.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { TermsandcondiComponent } from './components/termsandcondi/termsandcondi.component';
import { LibraryReviewerComponent } from './components/library-reviewer/library-reviewer.component';
import { ArticleformComponent } from './components/articleform/articleform.component';
import { AccountsecurityComponent } from './components/accountsecurity/accountsecurity.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { DeleteaccountComponent } from './components/deleteaccount/deleteaccount.component';
import { PhotoComponent } from './components/photo/photo.component';
import { UploadStatusComponent } from './components/upload-status/upload-status.component';
import { ArticleHistoryComponent } from './components/article-history/article-history.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ReviewerPostdetailsComponent } from './components/reviewer-postdetails/reviewer-postdetails.component';

const routes: Routes = [
  {
    path:"",
    redirectTo: 'homepage',
    pathMatch: 'full'
  },
  {
    path:"login",
    component: HeaderComponent
  },
  {
    path:"homepage",
    component: HomepageComponent
  },
  {
    path:"reviewervideo",
    component: ReviewervideoComponent
  },
  {
    path:"notification",
    component: NotificationComponent
  },
  {
    path:"article",
    component: ArticleComponent
  },
  {
    path:"courseInfo",
    component:CourseInfoComponent
  },
  {
    path: 'publish-articles/:id',
    component: ReviewerPostdetailsComponent,
  },
  {
    path:'aboutus',
    component:AboutusComponent
  },
  {
    path:'termsandconditions',
    component:TermsandcondiComponent
  },
  {
    path:'library',
    component:LibraryReviewerComponent
  },
  {
    path:"articleform",
    component:ArticleformComponent
  },
  {
    path:"profile",
    component: PhotoComponent
  },
  {
    path:'acSecurity',
    component:AccountsecurityComponent
  },
  {
    path:"notifications",
    component: NotificationsComponent
  },
  {
    path:"contactus",
    component: ContactusComponent
  },
  {
    path:"delete-account",
    component: DeleteaccountComponent
  },
  {
    path: 'uploadstatus',
    component: UploadStatusComponent,
  },
  { path: 'detail-articles/:id', 
  component: ArticleDetailComponent
},
  {
    path:"articleHistory",
    component: ArticleHistoryComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewerRoutingModule { }
