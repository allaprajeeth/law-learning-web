import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ReviewervideoComponent } from './components/reviewervideo/reviewervideo.component';
import { NotificationComponent } from './components/notification/notification.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { DeleteaccountComponent } from './components/deleteaccount/deleteaccount.component';
import { UploadStatusComponent } from './components/upload-status/upload-status.component';
import { ArticleHistoryComponent } from './components/article-history/article-history.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ReviewerPostdetailsComponent } from './components/reviewer-postdetails/reviewer-postdetails.component';
import {ArticleComponent} from './../../common/components/article/article.component'
import {AboutusComponent} from './../../common/components/aboutus/aboutus.component'
import { ProfileComponent } from 'src/app/common/components/profile/profile.component';
import { AccountsecurityComponent } from 'src/app/common/components/accountsecurity/accountsecurity.component';
import { SidenavContactusComponent } from 'src/app/common/components/sidenav-contactus/sidenav-contactus.component';
import { SidenavtermsconditionsComponent } from 'src/app/common/components/sidenavtermsconditions/sidenavtermsconditions.component';
import { LibraryComponent } from 'src/app/common/components/library/library.component';
import { CoursesHistoryComponent } from './components/courses-history/courses-history.component';
import { AdvisorDetailsComponent } from 'src/app/common/components/advisor-details/advisor-details.component';
import { InstructorinfoComponent } from '../instructor/components/instructorinfo/instructorinfo.component';
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
    component:SidenavtermsconditionsComponent
  },
  {
    path:'library',
    component:LibraryComponent
  },
  {
    path:"profile",
    component: ProfileComponent
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
    component: SidenavContactusComponent
  },
  {
    path:"delete-account",
    component: DeleteaccountComponent
  },
  {
    path: 'courses-history',
    component: CoursesHistoryComponent,
  },
  { path: 'detail-articles/:id', 
  component: ArticleDetailComponent
},
  {
    path:"articleHistory",
    component: ArticleHistoryComponent
  },
  {
    path:'advisorInfo/:id',
    component:AdvisorDetailsComponent
  },
    {
      path: 'instructorinfo/:id',
      component: InstructorinfoComponent,
    },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewerRoutingModule { }
