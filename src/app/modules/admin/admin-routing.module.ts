import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { NotificationComponent } from './components/notification/notification.component';
import { TermsandcondiComponent } from './components/termsandcondi/termsandcondi.component';
import { AdminLibraryComponent } from './components/library/library.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticleformComponent } from './components/articleform/articleform.component';
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
import { AuditReport2Component } from './components/audit-report2/audit-report2.component';
import { CoursesHistoryComponent } from './components/courses-history/courses-history.component';
import { ArticleHistoryComponent } from './components/article-history/article-history.component';
import { AllProfilesComponent } from './components/all-profiles/all-profiles.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { LibraryFormComponent } from './components/library-form/library-form.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { AboutusComponent } from 'src/app/common/components/aboutus/aboutus.component';


const routes: Routes = [
  {
    path:"",
    redirectTo: 'homepage',
    pathMatch: 'full'
  },
  {
    path:"login",
    component: AdminLoginComponent
  },
  {
    path:"adminnav",
    component: AdminnavComponent
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
    component:AdminLibraryComponent
  },
  {
path:'library/:id',
component:AdminLibraryComponent
  },
  { path: 'pdf-viewer', 
      component:PdfViewerComponent
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
    path:"audit-report2",
    component: AuditReport2Component
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
    component:LibraryFormComponent
  
}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
