import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewerLoginComponent } from './components/reviewer-login/reviewer-login.component';
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ReviewervideoComponent } from './components/reviewervideo/reviewervideo.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ArticleComponent } from './components/article/article.component';
import { DocumentsComponent } from './components/documents/documents.component';

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
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewerRoutingModule { }
