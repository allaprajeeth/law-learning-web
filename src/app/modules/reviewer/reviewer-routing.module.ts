import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewerLoginComponent } from './components/reviewer-login/reviewer-login.component';
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ReviewervideoComponent } from './components/reviewervideo/reviewervideo.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ArticleComponent } from './components/article/article.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { TermsandcondiComponent } from './components/termsandcondi/termsandcondi.component';

const routes: Routes = [
  {
    path:"",
    redirectTo: 'login',
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
    path:"documents",
    component: DocumentsComponent
  },
  {
    path:"courseInfo",
    component:CourseInfoComponent
  },
  {
    path:'aboutus',
    component:AboutusComponent
  },
  {
    path:'termsandcondi',
    component:TermsandcondiComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewerRoutingModule { }
