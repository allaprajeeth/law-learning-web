import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { NotificationComponent } from './components/notification/notification.component';
import { TermsandcondiComponent } from './components/termsandcondi/termsandcondi.component';
import { PhotoComponent } from './components/photo/photo.component';
import { AccountsecurityComponent } from './components/accountsecurity/accountsecurity.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { ContactusComponent } from './components/contactus/contactus.component';
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
import {DocumentsComponent} from './../../common/components/documents/documents.component'
import {ArticleComponent} from './../../common/components/article/article.component'
import {AboutusComponent} from './../../common/components/aboutus/aboutus.component'
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
    path:'library',
    component:DocumentsComponent
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
    component:TermsandcondiComponent
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
    path:"payments",
    component: PaymentsComponent
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
    path:"profile-details",
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
    component:DocumentsComponent
  
}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
