import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { FormsModule } from '@angular/forms';
import { InstructorRoutingModule } from './instructor-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InstructornavComponent } from './components/instructornav/instructornav.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CoursesComponent } from './components/courses/courses.component';
import { NotificationComponent } from './components/notification/notification.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { InstructorinfoComponent } from './components/instructorinfo/instructorinfo.component';
import { EditcoursesComponent } from './components/editcourses/editcourses.component';
import { ArticleComponent } from './components/article/article.component';
import { VideoplayerComponent } from './components/videoplayer/videoplayer.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { InstructorSidenavComponent } from './components/instructor-sidenav/instructor-sidenav.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { QuiztestComponent } from './components/quiztest/quiztest.component';
import { UploadComponent } from './components/upload/upload.component';
import { TestpreviewComponent } from './components/testpreview/testpreview.component';
import { SubmitarticlemesgComponent } from './components/submitarticlemesg/submitarticlemesg.component';
import { ArticleformComponent } from './components/articleform/articleform.component';
import { UploadstatusComponent } from './uploadstatus/uploadstatus.component';
import { UploadhistoryComponent } from './components/uploadhistory/uploadhistory.component';
import { InstructorService } from './components/instructor.service';
import { QuizsuccessmsgComponent } from './components/quizsuccessmsg/quizsuccessmsg.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AccountsecurityComponent } from './components/accountsecurity/accountsecurity.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';
import { InstructorOverviewComponent } from './components/instructor-overview/instructor-overview.component';
import { HistoryComponent } from './components/history/history.component';
import { StatusComponent } from './components/status/status.component';
import { LibraryInstructorComponent } from './components/library-instructor/library-instructor.component';
import { InstructorpostdetailsComponent } from './components/instructorpostdetails/instructorpostdetails.component';
import { TermsandcondiComponent } from './components/termsandcondi/termsandcondi.component';

@NgModule({
  declarations: [
    InstructornavComponent,
    HomepageComponent,
    CoursesComponent,
    NotificationComponent,
    PublicProfileComponent,
    InstructorinfoComponent,
    EditcoursesComponent,
    ArticleComponent,
    VideoplayerComponent,
    CourseInfoComponent,
    SuccessDialogComponent,
    InstructorSidenavComponent,
    AboutusComponent,
    QuiztestComponent,
    UploadComponent,
    TestpreviewComponent,
    SubmitarticlemesgComponent,
    ArticleformComponent,
    UploadstatusComponent,
    UploadhistoryComponent,
    QuizsuccessmsgComponent,
    SidenavComponent,
    AccountsecurityComponent,
    NotificationsComponent,
    ContactusComponent,
    DeleteAccountComponent,
    PaymentHistoryComponent,
    InstructorOverviewComponent,
    StatusComponent,
    HistoryComponent,
    LibraryInstructorComponent,
    InstructorpostdetailsComponent,
    TermsandcondiComponent
   
  ],
  
  providers: [InstructorService],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    InstructorRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTooltipModule,
    MatBadgeModule,
    MatToolbarModule ,
    MatCardModule,
    MatDividerModule,
   MatExpansionModule,
   MatTabsModule,
   MatDialogModule,
   MatSidenavModule,
  ],
  
  exports: [
 
    // other instructor components
  ],
})
export class InstructorModule { }
