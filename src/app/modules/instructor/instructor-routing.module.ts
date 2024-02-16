import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CoursesComponent } from './components/courses/courses.component';
import { NotificationComponent } from './components/notification/notification.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { InstructorinfoComponent } from './components/instructorinfo/instructorinfo.component';
import { EditcoursesComponent } from './components/editcourses/editcourses.component';
import { ArticleComponent } from './components/article/article.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { QuiztestComponent } from './components/quiztest/quiztest.component';
import { UploadComponent } from './components/upload/upload.component';
import { UploadstatusComponent } from './uploadstatus/uploadstatus.component';
import { QuizsuccessmsgComponent } from './components/quizsuccessmsg/quizsuccessmsg.component';
import { AccountsecurityComponent } from './components/accountsecurity/accountsecurity.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';
// import { InstructorOverviewComponent } from './components/instructor-overview/instructor-overview.component';
import { LibraryInstructorComponent } from './components/library-instructor/library-instructor.component';
import { ArticleformComponent } from './components/articleform/articleform.component';
import { InstructorpostdetailsComponent } from './components/instructorpostdetails/instructorpostdetails.component';
import { PdfviewerComponent } from 'src/app/shared-module/components/pdfviewer/pdfviewer.component';
import { TermsandcondiComponent } from './components/termsandcondi/termsandcondi.component';
import { HistoryComponent } from './components/history/history.component';
import { ApprovedCoursesOverviewComponent } from './components/approved-courses-overview/approved-courses-overview.component';
import { SubmissionCoursesInfoComponent } from './components/submission-courses-info/submission-courses-info.component';
import { UnderReviewCoursesInfoComponent } from './components/under-review-courses-info/under-review-courses-info.component';
import { ApprovedCoursesInfoComponent } from './components/approved-courses-info/approved-courses-info.component';
import { CommentedCoursesInfoComponent } from './components/commented-courses-info/commented-courses-info.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: HeaderComponent,
  },
  {
    path: 'homepage',
    component: HomepageComponent,
  },
  {
    path: 'instructoroverview',
    component: ApprovedCoursesOverviewComponent,
  },
  {
    path: 'profile',
    component: PublicProfileComponent,
  },
  {
    path: 'courses',
    component: CoursesComponent,
  },
  {
    path: 'courses/:id',
    component: CoursesComponent,
  },
  // {
  //   path: 'instructor/editcourses',
  //   component: EditcoursesComponent,
  // },
  {
    path: 'notification',
    component: NotificationComponent,
  },
  {
    path: 'instructorinfo',
    component: InstructorinfoComponent,
  },
  {
    path: 'article',
    component: ArticleComponent,
  },
  {
    path: 'articleform',
    component: ArticleformComponent,
  },
  {
    path: 'submissioncoursesInfo',
    component: SubmissionCoursesInfoComponent,
  },
  {
    path: 'underreviewcoursesInfo',
    component: UnderReviewCoursesInfoComponent,
  },
  {
    path: 'approvedcoursesInfo',
    component: ApprovedCoursesInfoComponent,
  },
  {
    path: 'commentedcoursesInfo',
    component: CommentedCoursesInfoComponent
    ,
  },
  {
    path: 'aboutus',
    component: AboutusComponent,
  },
  {
    path: 'quiztest',
    component: QuiztestComponent,
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
  },
  {
    path: 'upload',
    component: UploadComponent,
  },
  {
    path: 'uploadstatus',
    component: UploadstatusComponent,
  },
  {
    path: 'quizsuccessmsg',
    component: QuizsuccessmsgComponent,
  },
  {
    path: 'publish-articles/:id',
    component: InstructorpostdetailsComponent,
  },
  {
    path: 'acSecurity',
    component: AccountsecurityComponent,
  },
  {
    path: 'contactus',
    component: ContactusComponent,
  },
  {
    path: 'delete-account',
    component: DeleteAccountComponent,
  },
  {
    path: 'payment-history',
    component: PaymentHistoryComponent,
  },
  {
    path: 'library',
    component: LibraryInstructorComponent,
  },
  { 
    path: 'pdf-viewer', 
    component: PdfviewerComponent 
  },
  {
    path: 'termsandconditions',
    component: TermsandcondiComponent,
  },
  { 
    path: "articlehistory", 
    component: HistoryComponent 
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class InstructorRoutingModule {}
