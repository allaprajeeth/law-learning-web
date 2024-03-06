import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import {MatBadgeModule} from '@angular/material/badge';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { VideoplayerComponent } from './components/videoplayer/videoplayer.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { ErrorHandlerService } from 'src/app/common/services/error-handler/error-handler.service';
import { NotificationComponent } from './components/notification/notification.component';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { TermsandcondiComponent } from './components/termsandcondi/termsandcondi.component';
import { AdminLibraryComponent } from './components/library/library.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticleformComponent } from './components/articleform/articleform.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PhotoComponent } from './components/photo/photo.component';
import { DeleteaccountComponent } from './components/deleteaccount/deleteaccount.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AccountsecurityComponent } from './components/accountsecurity/accountsecurity.component';
import { AuditReportComponent } from './components/audit-report/audit-report.component';
import { AdminPostdetailComponent } from './components/admin-postdetail/admin-postdetail.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DashboardSidenavComponent } from './components/dashboard-sidenav/dashboard-sidenav.component';
import { DashboardNotificationsComponent } from './components/dashboard-notifications/dashboard-notifications.component';
import { AuditReport2Component } from './components/audit-report2/audit-report2.component';
import { ArticleHistoryComponent } from './components/article-history/article-history.component';
import { CoursesHistoryComponent } from './components/courses-history/courses-history.component';
import { AllProfilesComponent } from './components/all-profiles/all-profiles.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { LibraryFormComponent } from './components/library-form/library-form.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';



@NgModule({
  declarations: [
    AdminLoginComponent,
    HomepageComponent,
    AdminnavComponent,
    CourseInfoComponent,
    VideoplayerComponent,
    NotificationComponent,
    TermsandcondiComponent,
    AdminLibraryComponent,
    ArticleComponent,
    ArticleformComponent,
    PhotoComponent,
    DeleteaccountComponent,
    ContactusComponent,
    PaymentsComponent,
    NotificationsComponent,
    SidenavComponent,
    AccountsecurityComponent,
    AuditReportComponent,
    AdminPostdetailComponent,
    AdminDashboardComponent,
    DashboardSidenavComponent,
    DashboardNotificationsComponent,
    AuditReport2Component,
    ArticleHistoryComponent,
    CoursesHistoryComponent,
    AllProfilesComponent,
    ProfileDetailsComponent,
    ArticleDetailComponent,
    LibraryFormComponent,
    PdfViewerComponent,
 
   
  ],
  
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatBadgeModule,
    FormsModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatSlideToggleModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    },
  ]
})
export class AdminModule { }
