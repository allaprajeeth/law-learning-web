import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CoursesComponent } from './components/courses/courses.component';
import { NotificationComponent } from './components/notification/notification.component';
import { InstructorinfoComponent } from './components/instructorinfo/instructorinfo.component';
import { EditcoursesComponent } from './components/editcourses/editcourses.component';
import { QuiztestComponent } from './components/quiztest/quiztest.component';
import { UploadComponent } from './components/upload/upload.component';
import { UploadstatusComponent } from './uploadstatus/uploadstatus.component';
import { QuizsuccessmsgComponent } from './components/quizsuccessmsg/quizsuccessmsg.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';
import { InstructorpostdetailsComponent } from './components/instructorpostdetails/instructorpostdetails.component';
import { HistoryComponent } from './components/history/history.component';
import { ApprovedCoursesOverviewComponent } from './components/approved-courses-overview/approved-courses-overview.component';
import { SubmissionCoursesInfoComponent } from './components/submission-courses-info/submission-courses-info.component';
import { UnderReviewCoursesInfoComponent } from './components/under-review-courses-info/under-review-courses-info.component';
import { ApprovedCoursesInfoComponent } from './components/approved-courses-info/approved-courses-info.component';
import { CommentedCoursesInfoComponent } from './components/commented-courses-info/commented-courses-info.component';
import { CourseWidgetComponent } from './components/course-widget/course-widget.component';
import {ArticleComponent} from './../../common/components/article/article.component'
import {AboutusComponent} from './../../common/components/aboutus/aboutus.component'
import { ArticleFormComponent } from 'src/app/common/components/article-form/article-form.component';
import { ProfileComponent } from 'src/app/common/components/profile/profile.component';
import { AccountsecurityComponent } from 'src/app/common/components/accountsecurity/accountsecurity.component';
import { SidenavContactusComponent } from 'src/app/common/components/sidenav-contactus/sidenav-contactus.component';
import { SidenavtermsconditionsComponent } from 'src/app/common/components/sidenavtermsconditions/sidenavtermsconditions.component';
import { LibraryComponent } from 'src/app/common/components/library/library.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { AdvisorDetailsComponent } from 'src/app/common/components/advisor-details/advisor-details.component';
import { UploadedarticlesComponent } from './components/uploadedarticles/uploadedarticles.component';
import { LibraryByIdComponent } from 'src/app/common/components/library-by-id/library-by-id.component';
// import { UploadedarticlesComponent } from './components/uploadedarticles/uploadedarticles.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
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
    component: ProfileComponent,
  },
  {
    path: 'courses',
    component: CourseWidgetComponent,
  },
  {
    path: 'courses/:id',
    component: CourseWidgetComponent,
  },
  {
    path: 'notification',
    component: NotificationComponent,
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
    path: 'article',
    component: ArticleComponent,
  },
  {
    path: 'articleform',
    component: ArticleFormComponent,
  },
  {
    path: 'articleform/:id',
    component: ArticleFormComponent,
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
    path: 'upload/:courseId',
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
    path: 'create-profile',
    component: CreateProfileComponent,
  },
  {
    path: 'acSecurity',
    component: AccountsecurityComponent,
  },
  {
    path: 'contactus',
    component: SidenavContactusComponent,
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
    component: LibraryComponent
  },
  {
    path: 'termsandconditions',
    component: SidenavtermsconditionsComponent
  },
  {
    path: 'uploadedarticle/:id',
    component: UploadedarticlesComponent,
  },
  { 
    path: "articlehistory", 
    component: HistoryComponent 
  },
  {
    path:'libraries/:id',
    component:LibraryByIdComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class InstructorRoutingModule {}
