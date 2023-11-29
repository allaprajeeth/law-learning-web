import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NavComponent } from 'src/app/common/components/nav/nav.component';
import { AccountsecurityComponent } from './components/accountsecurity/accountsecurity.component';
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { PhotoComponent } from './components/photo/photo.component';
import { CartComponent } from './components/cart/cart.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SubscribernavComponent } from './components/subscribernav/subscribernav.component';
import { ArticleformComponent } from './components/articleform/articleform.component';
import { SubarticleComponent } from './subarticle/subarticle.component';
import { SubdocumentsComponent } from './subdocuments/subdocuments.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { SubmitmesgComponent } from './components/submitmesg/submitmesg.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { SuccessmesgComponent } from './components/successmesg/successmesg.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { SubscriberpostdetailsComponent } from './components/subscriberpostdetails/subscriberpostdetails.component';
import { TermsandcondiComponent } from './components/termsandcondi/termsandcondi.component';

const routes: Routes = [
  {
    path:"",
    redirectTo: 'login',
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
    path:"photo",
    component: PhotoComponent
  },
  {
    path:"public-profile",
    component:PublicProfileComponent
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
    path:"articleform",
    component:ArticleformComponent
  },
  {
    path:"article",
    component:SubarticleComponent
  },
  { 
    path: 'post/:id', 
    component: SubscriberpostdetailsComponent
  },
  {
    path:"documents",
    component:SubdocumentsComponent
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
    path:'termsandcondi',
    component:TermsandcondiComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriberRoutingModule { }
