import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NavComponent } from 'src/app/common/components/nav/nav.component';
import { AccountsecurityComponent } from './components/accountsecurity/accountsecurity.component';
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { PhotoComponent } from './components/photo/photo.component';
import { CartComponent } from './components/cart/cart.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SubscribernavComponent } from './components/subscribernav/subscribernav.component';
import { ArticleformComponent } from './components/articleform/articleform.component';
import { SubarticleComponent } from './subarticle/subarticle.component';
import { SubdocumentsComponent } from './subdocuments/subdocuments.component';
import { SubmitmesgComponent } from './components/submitmesg/submitmesg.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { SuccessmesgComponent } from './components/successmesg/successmesg.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { SubscriberpostdetailsComponent } from './components/subscriberpostdetails/subscriberpostdetails.component';
import { TermsandcondiComponent } from './components/termsandcondi/termsandcondi.component';
import { OverviewComponent } from './components/overview/overview.component';
import { StatusarticlepageComponent } from './components/statusarticlepage/statusarticlepage.component';
import { ArticleHistoryComponent } from './components/articleHistory/article-history.component';
import { UnderreviewarticleComponent } from './components/underreviewarticle/underreviewarticle.component';
import { CommentedarticleComponent } from './components/commentedarticle/commentedarticle.component';
import {DocumentsComponent} from './../../common/components/documents/documents.component'
import {ArticleComponent} from './../../common/components/article/article.component'
import {AboutusComponent} from './../../common/components/aboutus/aboutus.component'
const routes: Routes = [
  {
    path:"",
    redirectTo: 'homepage',
    pathMatch: 'full'
  },
  {
    path:"login/:category",
    component: HeaderComponent
  },
  {
    path:'homepage',
    component:HomepageComponent
  },
  {
    path:'acSecurity',
    component:AccountsecurityComponent
  },
  {
    path:"sidenav",
    component: SidenavComponent
  },
  {
    path:"nav",
    component: NavComponent
  },
  {
    path:"subscriptions",
    component: SubscriptionsComponent
  },
  {
    path:"profile",
    component: PhotoComponent
  },
  {
    path:"notifications",
    component: NotificationsComponent
  },
  {
    path:"payments",
    component: PaymentsComponent
  },
  {
    path:"contactus",
    component: ContactusComponent
  },
  {
    path:"delete-account",
    component: DeleteAccountComponent
  },
  {
    path:"cart",
    component: CartComponent
  },
  {
    path:"notification",
    component: NotificationComponent
  },
  {
    path:"navbar",
    component:SubscribernavComponent
  },
  {
    path:"article-form",
    component:ArticleformComponent
  },
  {
    path:"article",
    component:ArticleComponent
  },
  // { 
  //   path: 'post/:id', 
  //   component: SubscriberpostdetailsComponent
  // },
  {
    path:"library",
    component:DocumentsComponent
  },
  {
    path:"aboutus",
    component:AboutusComponent
  },
  {
    path:"submitmesg",
    component: SubmitmesgComponent
  },
  {
    path:'successmesg',
    component:SuccessmesgComponent
  },
  {
    path:'courseinfo',
    component:CourseInfoComponent
  },
  {
    path:'termsandconditions',
    component:TermsandcondiComponent
  },
  {
   path:'overview',
   component:OverviewComponent
  },
  // {
  //   path:'article-details',
  //   component:StatusarticlepageComponent
  //  },
   {
    path:'under-review',
    component:UnderreviewarticleComponent
   },
   {
    path:'commented',
    component:CommentedarticleComponent
   },
  //  {
  //   path:'published-articles',
  //  },
  {
    path:'articleHistory',
    component:ArticleHistoryComponent
   },
  //  { 
  //   path: 'article-details/:id', 
  //   component: StatusarticlepageComponent
  //  },
   {
    path: 'publish-articles/:id',
    component: SubscriberpostdetailsComponent
  }
  //  {
  //   path:'statusarticlepage',
  //   component:StatusarticlepageComponent
  //  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriberRoutingModule { }
