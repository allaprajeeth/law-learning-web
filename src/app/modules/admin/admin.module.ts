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
import {MatIconModule} from '@angular/material/icon';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { VideoplayerComponent } from './components/videoplayer/videoplayer.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ErrorHandlerService } from 'src/app/common/services/error-handler/error-handler.service';
import { NotificationComponent } from './components/notification/notification.component';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { TermsandcondiComponent } from './components/termsandcondi/termsandcondi.component';
import { AdminLibraryComponent } from './components/admin-library/admin-library.component';
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

@NgModule({
  declarations: [
    AdminLoginComponent,
    HomepageComponent,
    AdminnavComponent,
    CourseInfoComponent,
    VideoplayerComponent,
    AboutusComponent,
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
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    },
  ]
})
export class AdminModule { }
