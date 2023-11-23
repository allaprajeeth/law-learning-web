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
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { QuiztestComponent } from './components/quiztest/quiztest.component';
import { UploadComponent } from './components/upload/upload.component';
import { UploadstatusComponent } from './uploadstatus/uploadstatus.component';
import { UploadhistoryComponent } from './components/uploadhistory/uploadhistory.component';
import { QuizsuccessmsgComponent } from './components/quizsuccessmsg/quizsuccessmsg.component';
import { AccountsecurityComponent } from './components/accountsecurity/accountsecurity.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';
import { LibraryComponent } from './components/library/library.component';
import { ArticleformComponent } from './components/articleform/articleform.component';
import { InstructorOverviewComponent } from './components/instructor-overview/instructor-overview.component';
import { InstructorpostdetailsComponent } from './components/instructorpostdetails/instructorpostdetails.component';
const routes: Routes = [
  {
    path:"",
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:"login",
    component: HeaderComponent
  },
  {
    path:"homepage",
    component: HomepageComponent
  },
  {
    path:"instructoroverview",
    component: InstructorOverviewComponent
  },
  {
    path:"public-profile",
    component: PublicProfileComponent
  },
  
  {
    path:"courses",
component:CoursesComponent
},
{
  path:"editcourses",
component:EditcoursesComponent
},
{
  path:"notification",
component:NotificationComponent
},
{
  path:"instructorinfo",
component:InstructorinfoComponent
},
{
  path:"article",
component:ArticleComponent
},
{
  path:"articleform",
component:ArticleformComponent
},
{
  path:"courseInfo",
  component:CourseInfoComponent
},
{
  path:"aboutus",
  component:AboutusComponent,
},
{
  path:"quiztest",
  component:QuiztestComponent
},
{
  path:"notifications",
  component: NotificationsComponent
},
{
  path:"upload",
  component: UploadComponent
},
{
  path:"uploadstatus",
  component: UploadstatusComponent
},
{ path: 'uploadhistory', component: UploadhistoryComponent },
{
  path:"quizsuccessmsg",
  component: QuizsuccessmsgComponent
},
{ 
  path: 'post/:id', 
  component: InstructorpostdetailsComponent
},
{
  path:"acSecurity",
  component:AccountsecurityComponent
},
{
  path:"contactus",
  component:ContactusComponent
},
{
  path:"delete-account",
  component: DeleteAccountComponent
},
{
  path:"payment-history",
  component: PaymentHistoryComponent
},
{
  path:"library",
component:LibraryComponent
},





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }
