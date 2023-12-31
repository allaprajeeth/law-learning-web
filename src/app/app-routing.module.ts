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
import { AdvisorDetailsComponent } from './common/components/advisor-details/advisor-details.component';
import { PostdetailComponent } from './common/components/postdetail/postdetail.component';
import { PdfViewerComponent } from './common/components/pdf-viewer/pdf-viewer.component';
import { SharedTCComponent } from './shared-module/components/shared-tc/shared-tc.component';

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
    path:'overviewAvailable',
    component:OverviewFreecourseComponent

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
    path:"instructor/editcourses",
    component:EditcoursesComponent
  },
  
    { path: 'pdf-viewer', 
      component:PdfViewerComponent
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
    component: SharedTCComponent
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
    path: 'post/:id', 
    component: PostdetailComponent
  },
  {
    path:'forgotPhoneno',
    component:ForgotPhonenoComponent
  },
  {
    path:'advisorInfo',
    component:AdvisorDetailsComponent
  },
  {
    path:'forgotEmail',
    component:ForgotEmailComponent
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
