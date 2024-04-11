import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { DeleteaccountComponent } from './components/deleteaccount/deleteaccount.component';
import { AuditReportComponent } from './components/audit-report/audit-report.component';
import { AdminPostdetailComponent } from './components/admin-postdetail/admin-postdetail.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DashboardNotificationsComponent } from './components/dashboard-notifications/dashboard-notifications.component';
import { CoursesHistoryComponent } from './components/courses-history/courses-history.component';
import { ArticleHistoryComponent } from './components/article-history/article-history.component';
import { AllProfilesComponent } from './components/all-profiles/all-profiles.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import {ArticleComponent} from './../../common/components/article/article.component'
import {AboutusComponent} from './../../common/components/aboutus/aboutus.component'
import { ProfileComponent } from 'src/app/common/components/profile/profile.component';
import { AccountsecurityComponent } from 'src/app/common/components/accountsecurity/accountsecurity.component';
import { SidenavContactusComponent } from 'src/app/common/components/sidenav-contactus/sidenav-contactus.component';
import { SidenavtermsconditionsComponent } from 'src/app/common/components/sidenavtermsconditions/sidenavtermsconditions.component';
import { LibraryComponent } from 'src/app/common/components/library/library.component';
import { LibraryFormComponent } from './components/library-form/library-form.component';
import { LibraryHistoryComponent } from './components/library-history/library-history.component';
import { AdvisorProfilesFormComponent } from './components/advisor-profiles-form/advisor-profiles-form.component';
import { AdvisorDetailsComponent } from 'src/app/common/components/advisor-details/advisor-details.component';
import { InstructorinfoComponent } from '../instructor/components/instructorinfo/instructorinfo.component';
import { EditAdvisorProfileComponent } from './components/edit-advisor-profile/edit-advisor-profile.component';
const routes: Routes = [
  {
    path:"",
    redirectTo: 'homepage',
    pathMatch: 'full'
  },
  {
    path:"homepage",
    component: HomepageComponent
  },
  {
    path: 'courseInfo',
    component:CourseInfoComponent
  },

   {
    path:'article',
    component:ArticleComponent
  },
  {
    path:'aboutus',
    component:AboutusComponent
  },
  {
    path:'notification',
    component:NotificationComponent
  },
  {
    path:'termsandconditions',
    component:SidenavtermsconditionsComponent
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
  {
    path:"delete-account",
    component: DeleteaccountComponent
  },
  {
    path:"audit-report",
    component: AuditReportComponent
  },
  {
    path:"courses-history",
    component: CoursesHistoryComponent
  },
  {
    path:"all-profiles",
    component: AllProfilesComponent
  },
  {
    path:"profile-details/:id",
    component: ProfileDetailsComponent
  },
  {
    path:"article-history",
    component: ArticleHistoryComponent
  },
  {
    path: 'post/:id',
    component:AdminPostdetailComponent
  },
  {
    path:"dashboard",
    component:AdminDashboardComponent
  },
  {
    path:"dash-notifications",
    component:DashboardNotificationsComponent
  },
  { path: 'detail-articles/:id', 
  component: ArticleDetailComponent
},
{
  path: 'publish-articles/:id',
  component: AdminPostdetailComponent
},
{
    path:"libraryForm",
    component:LibraryFormComponent
},
{
 path:"library",
 component:LibraryComponent 
},
{
  path:"library-history",
  component:LibraryHistoryComponent
},
{
 path:"advisorprofileForm",
 component:AdvisorProfilesFormComponent 
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
  path:"editadvisor/:id",
  component:EditAdvisorProfileComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
