import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './common/components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './common/components/page-not-found/page-not-found.component';
import { authGuard } from './common/guards/auth-guard/auth.guard';
import { RegisterComponent } from './common/components/register/register.component';
import { HeaderComponent } from './common/components/header/header.component';
import { NavComponent } from './common/components/nav/nav.component';
import { HomepageComponent } from './common/components/homepage/homepage.component';
import { ArticleComponent } from './common/components/article/article.component';
import { DocumentsComponent } from './common/components/documents/documents.component';
import { CoursesComponent } from './common/components/courses/courses.component';
import { UploadComponent } from './common/components/upload/upload.component';
import { LogoutComponent } from './common/components/logout/logout.component';
import { PasswordComponent } from './common/components/password/password.component';
import { VideoplayerComponent } from './common/components/videoplayer/videoplayer.component';
import { LoginComponent } from './common/components/login/login.component';
import { FooterComponent } from './shared-module/components/footer/footer.component';
import { CourseInfoComponent } from './common/components/course-info/course-info.component';
import { OverviewComponent } from './common/components/overview/overview.component';
import { FreecourseComponent } from './common/components/freecourse/freecourse.component';
import { AboutusComponent } from './common/components/aboutus/aboutus.component';
import { PhonepasswordComponent } from './common/components/phonepassword/phonepassword.component';


const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'instructor',
    loadChildren: () => import('./modules/instructor/instructor.module').then(m => m.InstructorModule)
  },
  {
    path: 'subscriber',
    loadChildren: () => import('./modules/subscriber/subscriber.module').then(m => m.SubscriberModule)
  },
  {
    path: 'reviewer',
    loadChildren: () => import('./modules/reviewer/reviewer.module').then(m => m.ReviewerModule)
  },
  {
    path: 'authentication',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  // {
  //   path: 'user',
  //   loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  // },
  {
    path: '',
    canActivate: [authGuard],
    component: HeaderComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: ':category/homepage',
    component:HomepageComponent
  },
  {
    path: 'header',
    component:HeaderComponent
  },
  {
    path: 'article',
    component:ArticleComponent
  },
  {
    path: 'overview',
    component:OverviewComponent
  },
  {
    path: 'documents',
    component:DocumentsComponent
  },
  {
    path: 'courses',
    component:CoursesComponent
  },
  {
    path: 'upload',
    component:UploadComponent
  },
  {
    path: 'password',
    component:PasswordComponent
  },
  {
    path: 'phonepassword',
    component:PhonepasswordComponent
  },
  {
    path: 'videoplayer',
    component:VideoplayerComponent
  },
  {
    path: 'courseInfo',
    component:CourseInfoComponent
  },
  {
    path: 'freecourse',
    component:FreecourseComponent
  },
  {
    path:'aboutus',
    component:AboutusComponent
  },
  {
    path: 'footer',
    component: FooterComponent
  },
  // {
  //   path: 'logout',
  //   component:LogoutComponent
  // },
  {
    path: '**',
    component: PageNotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




