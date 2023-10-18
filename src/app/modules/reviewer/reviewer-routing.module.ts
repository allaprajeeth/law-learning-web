import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewerLoginComponent } from './components/reviewer-login/reviewer-login.component';
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ReviewervideoComponent } from './components/reviewervideo/reviewervideo.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewerRoutingModule { }
