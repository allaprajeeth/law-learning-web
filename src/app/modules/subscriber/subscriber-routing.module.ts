import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SubmitmesgComponent } from './components/submitmesg/submitmesg.component';
import { SuccessmesgComponent } from './components/successmesg/successmesg.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { SubscriberpostdetailsComponent } from './components/subscriberpostdetails/subscriberpostdetails.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ArticleHistoryComponent } from './components/articleHistory/article-history.component';
import { UnderreviewarticleComponent } from './components/underreviewarticle/underreviewarticle.component';
import { CommentedarticleComponent } from './components/commentedarticle/commentedarticle.component';
import { ArticleComponent } from './../../common/components/article/article.component';
import { AboutusComponent } from './../../common/components/aboutus/aboutus.component';
import { ArticleFormComponent } from 'src/app/common/components/article-form/article-form.component';
import { ProfileComponent } from 'src/app/common/components/profile/profile.component';
import { AccountsecurityComponent } from 'src/app/common/components/accountsecurity/accountsecurity.component';
import { SidenavContactusComponent } from 'src/app/common/components/sidenav-contactus/sidenav-contactus.component';
import { SidenavtermsconditionsComponent } from 'src/app/common/components/sidenavtermsconditions/sidenavtermsconditions.component';
import { LibraryComponent } from 'src/app/common/components/library/library.component';
import { AdvisorDetailsComponent } from 'src/app/common/components/advisor-details/advisor-details.component';
import { InstructorinfoComponent } from '../instructor/components/instructorinfo/instructorinfo.component';
import { LibraryByIdComponent } from 'src/app/common/components/library-by-id/library-by-id.component';
import { DeleteAccountComponent } from 'src/app/common/components/delete-account/delete-account.component';
import { RevertDeleteComponent } from 'src/app/common/components/revert-delete/revert-delete.component';
import { UploadedarticlesstatusComponent } from 'src/app/shared-module/components/uploadedarticlesstatus/uploadedarticlesstatus.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full',
  },
  {
    path: 'login/:category',
    component: HeaderComponent,
  },
  {
    path: 'homepage',
    component: HomepageComponent,
  },
  {
    path: 'acSecurity',
    component: AccountsecurityComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'payments',
    component: PaymentsComponent,
  },
  {
    path: 'contactus',
    component:SidenavContactusComponent
  },
  {
    path: 'delete-account',
      component: DeleteAccountComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'notification',
    component: NotificationComponent,
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
    path: 'article',
    component: ArticleComponent,
  },
  {
    path: 'library',
    component: LibraryComponent,
  },
  {
    path: 'aboutus',
    component: AboutusComponent,
  },
  {
    path: 'submitmesg',
    component: SubmitmesgComponent,
  },
  {
    path: 'successmesg',
    component: SuccessmesgComponent,
  },
  {
    path: 'courseinfo/:id',
    component: CourseInfoComponent,
  },
  {
    path: 'termsandconditions',
    component: SidenavtermsconditionsComponent,
  },
  {
    path: 'overview',
    component: OverviewComponent,
  },
  {
    path: 'under-review',
    component: UnderreviewarticleComponent,
  },
  {
    path: 'commented',
    component: CommentedarticleComponent,
  },
  {
    path: 'articleHistory',
    component: ArticleHistoryComponent,
  },
  {
    path: 'revert-delete',
    component:RevertDeleteComponent,
  },
  {
    path: 'publish-articles/:id',
    component: SubscriberpostdetailsComponent,
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
    path: 'uploadedarticle/:id',
    component: UploadedarticlesstatusComponent,
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
export class SubscriberRoutingModule {}
