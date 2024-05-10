import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { ArticlelistHistoryComponent } from './components/articlelist-history/articlelist-history.component';
import { ArticleDetailsComponent } from 'src/app/common/components/article-details/article-details.component';
import { CmPostdetailsComponent } from './components/cm-postdetails/cm-postdetails.component';
import {ArticleComponent} from './../../common/components/article/article.component'
import {AboutusComponent} from './../../common/components/aboutus/aboutus.component'
import { ProfileComponent } from 'src/app/common/components/profile/profile.component';
import { AccountsecurityComponent } from 'src/app/common/components/accountsecurity/accountsecurity.component';
import { SidenavContactusComponent } from 'src/app/common/components/sidenav-contactus/sidenav-contactus.component';
import { SidenavtermsconditionsComponent } from 'src/app/common/components/sidenavtermsconditions/sidenavtermsconditions.component';
import { LibraryComponent } from 'src/app/common/components/library/library.component';
import { CourseHistoryComponent } from './components/course-history/course-history.component';
import { NotificationComponent } from './components/notification/notification.component';
import { AdvisorDetailsComponent } from 'src/app/common/components/advisor-details/advisor-details.component';
import { InstructorinfoComponent } from '../instructor/components/instructorinfo/instructorinfo.component';
import { LibraryByIdComponent } from 'src/app/common/components/library-by-id/library-by-id.component';
import { DeleteAccountComponent } from 'src/app/common/components/delete-account/delete-account.component';
import { RevertDeleteComponent } from 'src/app/common/components/revert-delete/revert-delete.component';

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
    path:'courseinfo/:id',
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
    path:"notification",
    component: NotificationComponent
  },
  {
    path:"payments",
    component: PaymentsComponent
  },
  {
    path:"contactus",
    component: SidenavContactusComponent
  },
  {
   path:'delete-account',
   component:DeleteAccountComponent 
  },
  {
    path:'revert-delete',
    component:RevertDeleteComponent
  },
  {
    path:"courses-history",
    component:CourseHistoryComponent
  },
  {
    path:"articleListHistory",
    component: ArticlelistHistoryComponent
  },
  { path: 'detail-articles/:id', 
  component: ArticleDetailsComponent
},
{
  path: 'publish-articles/:id',
  component: CmPostdetailsComponent
},
  {
    path:'advisorInfo/:id',
    component:AdvisorDetailsComponent
  },
    {
      path: 'instructorinfo/:id',
      component: InstructorinfoComponent,
    },
    {
      path:'libraries/:id',
      component:LibraryByIdComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
