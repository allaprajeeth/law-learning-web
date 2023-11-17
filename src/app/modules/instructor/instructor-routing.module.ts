import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorLoginComponent } from './components/instructor-login/instructor-login.component';
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
import { DocumentsComponent } from './components/documents/documents.component';
import { ArticleformComponent } from './components/articleform/articleform.component';

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
    path:"document",
    component:DocumentsComponent
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
// {
//   path:"documents",
//   component: DocumentsComponent
// },
{
  path:"upload",
  component: UploadComponent
},
// {
//   path:"articleform",
//   component: ArticleformComponent
// }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }
