import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './components/homepage/homepage.component';
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
import { ArticleComponent } from './components/article/article.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PaymentsComponent } from './components/payments/payments.component';
import { AuditReportComponent } from './components/audit-report/audit-report.component';
import { AdminPostdetailComponent } from './components/admin-postdetail/admin-postdetail.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DashboardSidenavComponent } from './components/dashboard-sidenav/dashboard-sidenav.component';
import { DashboardNotificationsComponent } from './components/dashboard-notifications/dashboard-notifications.component';
import { ArticleHistoryComponent } from './components/article-history/article-history.component';
import { CoursesHistoryComponent } from './components/courses-history/courses-history.component';
import { AllProfilesComponent } from './components/all-profiles/all-profiles.component';
import { LibraryFormComponent } from './components/library-form/library-form.component';
import { LibraryHistoryComponent } from './components/library-history/library-history.component';
import { AdvisorProfilesFormComponent } from './components/advisor-profiles-form/advisor-profiles-form.component';
import { MatRadioModule } from '@angular/material/radio';
import { EditAdvisorProfileComponent } from './components/edit-advisor-profile/edit-advisor-profile.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PublishSuccessComponent } from './components/publish-success/publish-success.component';

@NgModule({
  declarations: [
    HomepageComponent,
    CourseInfoComponent,
    VideoplayerComponent,
    NotificationComponent,
    ArticleComponent,
    PaymentsComponent,
    AuditReportComponent,
    AdminPostdetailComponent,
    AdminDashboardComponent,
    DashboardSidenavComponent,
    DashboardNotificationsComponent,
    ArticleHistoryComponent,
    CoursesHistoryComponent,
    AllProfilesComponent,
    LibraryFormComponent,
    LibraryHistoryComponent,
    AdvisorProfilesFormComponent,
    EditAdvisorProfileComponent,
    PublishSuccessComponent,
  ],
  
  imports: [
    CommonModule,
    MatRadioModule,
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
    MatSlideToggleModule,
    MatSnackBarModule,
    
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    },
  ]
})
export class AdminModule { }
