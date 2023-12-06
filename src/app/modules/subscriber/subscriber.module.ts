import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { SubscriberRoutingModule } from './subscriber-routing.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MainnavComponent } from './components/mainnav/mainnav.component';
import { CartComponent } from './components/cart/cart.component';
import { AccountsecurityComponent } from './components/accountsecurity/accountsecurity.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PhotoComponent } from './components/photo/photo.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { SubscribernavComponent } from './components/subscribernav/subscribernav.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { EditEmailComponent } from './components/edit-email/edit-email.component';
import { MyDirectiveDirective } from './components/my-directive.directive';
import { NotificationComponent } from './components/notification/notification.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { CoursesPageComponent } from 'src/app/common/components/courses-page/courses-page.component';
import { NumberchangepopupComponent } from './components/numberchangepopup/numberchangepopup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ArticleformComponent } from './components/articleform/articleform.component';
import { SubarticleComponent } from './subarticle/subarticle.component';
import { SubdocumentsComponent } from './subdocuments/subdocuments.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { CarouselModule } from 'primeng/carousel';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SubmitmesgComponent } from './components/submitmesg/submitmesg.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { ArticleHistoryComponent } from './components/articleHistory/article-history.component';
import { SuccessmesgComponent } from './components/successmesg/successmesg.component';
import { VideoplayerSubscriberComponent } from './components/videoplayer-subscriber/videoplayer-subscriber.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import {MatTabsModule} from '@angular/material/tabs';
import { OverviewComponent } from './components/overview/overview.component';
import { RatingsComponent } from './components/ratings/ratings.component';
import { SubscriberpostdetailsComponent } from './components/subscriberpostdetails/subscriberpostdetails.component';
import { TermsandcondiComponent } from './components/termsandcondi/termsandcondi.component';
import { StatusarticlepageComponent } from './components/statusarticlepage/statusarticlepage.component';


@NgModule({
  declarations: [
    SidenavComponent, 
    MainnavComponent,
    CartComponent,
    AccountsecurityComponent,
    SubscriptionsComponent,
    PhotoComponent,
    NotificationsComponent,
    PaymentsComponent,
    DeleteAccountComponent,
    SubscribernavComponent,
    HomepageComponent,
    EditEmailComponent,
    MyDirectiveDirective,
    NotificationComponent,
    CourseCardComponent,
    CoursesPageComponent,
    NumberchangepopupComponent,
    ArticleformComponent,
    SubarticleComponent,
    SubdocumentsComponent,
    AboutusComponent,
    CheckoutComponent,
    SubmitmesgComponent,
    ContactusComponent,
    ArticleHistoryComponent,
    SuccessmesgComponent,
    VideoplayerSubscriberComponent,
    CourseInfoComponent,
    OverviewComponent,
    RatingsComponent,
    SubscriberpostdetailsComponent,
    TermsandcondiComponent,
    StatusarticlepageComponent,
 
   
  ],
  imports: [
    CommonModule,
    SharedModule,
    SubscriberRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    FormsModule,
    MatInputModule,
    CarouselModule,
    MatRadioModule,
    MatMenuModule,
    MatButtonModule,
    MatBadgeModule,
    MatDialogModule,
    MatCardModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatDividerModule,
    MatExpansionModule,
    MatTabsModule,
  ]
})
export class SubscriberModule { }
