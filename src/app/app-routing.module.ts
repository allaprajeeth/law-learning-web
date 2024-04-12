import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './common/components/page-not-found/page-not-found.component';
import { authGuard } from './common/guards/auth-guard/auth.guard';
import { RegisterComponent } from './common/components/register/register.component';
import { HeaderComponent } from './common/components/header/header.component';
import { HomepageComponent } from './common/components/homepage/homepage.component';
import { ArticleComponent } from './common/components/article/article.component';
import { VideoplayerComponent } from './common/components/videoplayer/videoplayer.component';
import { LoginComponent } from './common/components/login/login.component';
import { FooterComponent } from './shared-module/components/footer/footer.component';
import { CourseInfoComponent } from './common/components/course-info/course-info.component';
import { OverviewComponent } from './common/components/overview/overview.component';
import { FreecourseComponent } from './common/components/freecourse/freecourse.component';
import { AboutusComponent } from './common/components/aboutus/aboutus.component';
import { TermsandconComponent } from './common/termsandcon/termsandcon.component';
import { CartComponent } from './modules/subscriber/components/cart/cart.component'; 
import { ContactusComponent } from './common/components/contactus/contactus.component';
import { EditcoursesComponent } from './modules/instructor/components/editcourses/editcourses.component';
import { CheckoutComponent } from './modules/subscriber/components/checkout/checkout.component';
import { ForgotEmailComponent } from './common/components/forgot-email/forgot-email.component';
import { ForgotPhonenoComponent } from './common/components/forgot-phoneno/forgot-phoneno.component';
import { OverviewFreecourseComponent } from './common/components/overview-freecourse/overview-freecourse.component';
import { PostdetailComponent } from './common/components/postdetail/postdetail.component';
import { roleGuard } from './common/guards/role-guard/role.guard';
import { redirectGuard } from './common/guards/redirect-guard/redirect.guard';
import { AdvisorDetailsComponent } from './common/components/advisor-details/advisor-details.component';
import { TermsconditionsComponent } from './common/components/termsconditions/termsconditions.component';
import { LibraryComponent } from './common/components/library/library.component';
import { InstructorinfoComponent } from './modules/instructor/components/instructorinfo/instructorinfo.component';

import { SharedarticleHistoryComponent } from './shared-module/components/sharedarticle-history/sharedarticle-history.component';
import { RevertDeleteComponent } from './common/components/revert-delete/revert-delete.component';




const routes: Routes = [
  {
    path: 'admin',
    canActivateChild: [roleGuard],
    data: { roles: ['ADMIN'] },
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'instructor',
    canActivateChild: [roleGuard],
    data: { roles: ['INSTRUCTOR'] },
    loadChildren: () => import('./modules/instructor/instructor.module').then(m => m.InstructorModule)
  },
  {
    path: 'subscriber',
    canActivateChild: [roleGuard],
    data: { roles: ['SUBSCRIBER'] },
    loadChildren: () => import('./modules/subscriber/subscriber.module').then(m => m.SubscriberModule)
  },
  {
    path: 'reviewer',
    canActivateChild: [roleGuard],
    data: { roles: ['REVIEWER'] },
    loadChildren: () => import('./modules/reviewer/reviewer.module').then(m => m.ReviewerModule)
  },
  {
    path: 'authentication',
    canActivateChild: [roleGuard],
    data: { roles: ['CONTENTMANAGER'] },
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: '',
    //canActivate: [redirectGuard],
    component: HeaderComponent
  },
  {
    path: 'login',
    //canActivate: [redirectGuard],
    component: LoginComponent
  },
  {
    path: 'register',
    //canActivate: [redirectGuard],
    component: RegisterComponent
  },
  {
    path: ':category/homepage',
    component:HomepageComponent
  },
  {
    path:'overviewAvailable',
    component:OverviewFreecourseComponent

  },
  {
    path: 'header',
    canActivate: [redirectGuard],
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
    path: 'library',
    component:LibraryComponent
  },
  {
    path:"instructor/editcourses",
    component:EditcoursesComponent
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
    path:'contactus',
    component:ContactusComponent
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
  {
    path: 'termsandcon',
    component: TermsconditionsComponent
  },
  { 
    path: 'cart', 
    component: CartComponent 
  },
  { 
    path: 'checkout',
    component: CheckoutComponent 
  },
  {
    path: 'publish-articles/:id',
    component: PostdetailComponent
  },
  {
    path:'forgotPhoneno',
    component:ForgotPhonenoComponent
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
    path:'revert-delete',
    component:RevertDeleteComponent
  },
  {
    path:'forgotEmail',
    component:ForgotEmailComponent
  },
  {
    path:'articleform',
    component:SharedarticleHistoryComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{ scrollPositionRestoration: 'top',})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
