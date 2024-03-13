import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { DeleteaccountComponent } from './components/deleteaccount/deleteaccount.component';
import { ArticlelistHistoryComponent } from './components/articlelist-history/articlelist-history.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { CmPostdetailsComponent } from './components/cm-postdetails/cm-postdetails.component';
import {ArticleComponent} from './../../common/components/article/article.component'
import {AboutusComponent} from './../../common/components/aboutus/aboutus.component'
import { ProfileComponent } from 'src/app/common/components/profile/profile.component';
import { AccountsecurityComponent } from 'src/app/common/components/accountsecurity/accountsecurity.component';
import { SidenavContactusComponent } from 'src/app/common/components/sidenav-contactus/sidenav-contactus.component';
import { SidenavtermsconditionsComponent } from 'src/app/common/components/sidenavtermsconditions/sidenavtermsconditions.component';
import { LibraryComponent } from 'src/app/common/components/library/library.component';
import { CourseHistoryComponent } from './components/course-history/course-history.component';
const routes: Routes = [
  {
    path:"",
    redirectTo: 'homepage',
    pathMatch: 'full'
  },
  {
    path:'homepage',
    component: HomepageComponent
  },
  {
    path:'homepage',
    component: HomepageComponent
  },
  {
    path:'courseInfo',
    component:CourseInfoComponent
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
   path:'article',
   component:ArticleComponent
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
    path:"payments",
    component: PaymentsComponent
  },
  {
    path:"contactus",
    component: SidenavContactusComponent
  },
  // {
  //   path:"courses-history",
  //   component:CourseHistoryComponent
  // },
  {
    path:"articleListHistory",
    component: ArticlelistHistoryComponent
  },
  { path: 'detail-articles/:id', 
  component: ArticleDetailComponent 
},
{
  path: 'publish-articles/:id',
  component: CmPostdetailsComponent
},
  {
    path:"delete-account",
    component: DeleteaccountComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
