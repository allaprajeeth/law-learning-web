import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared-module/shared.module';

import { SubscriberRoutingModule } from './subscriber-routing.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MainnavComponent } from './components/mainnav/mainnav.component';
import { CartComponent } from './components/cart/cart.component';
import { AccountsecurityComponent } from './components/accountsecurity/accountsecurity.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';

import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
// import {NgFor} from '@angular/common';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PhotoComponent } from './components/photo/photo.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { SubscribernavComponent } from './components/subscribernav/subscribernav.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { EditEmailComponent } from './components/edit-email/edit-email.component';
import { MyDirectiveDirective } from './components/my-directive.directive';
import { NotificationComponent } from './notification/notification.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { CoursesPageComponent } from 'src/app/common/components/courses-page/courses-page.component';
import { NumberchangepopupComponent } from './components/numberchangepopup/numberchangepopup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ArticleformComponent } from './components/articleform/articleform.component';




import { CourseCardComponent } from './components/course-card/course-card.component';


@NgModule({
  declarations: [
    SidenavComponent,
    MainnavComponent,
    CartComponent,
    AccountsecurityComponent,
    SubscriptionsComponent,
    PhotoComponent,
    PublicProfileComponent,
    NotificationsComponent,
    PaymentsComponent,
    DeleteAccountComponent,
    SubscribernavComponent,
    HomepageComponent,
    EditEmailComponent,
    MyDirectiveDirective,
    NotificationComponent,
    CourseCardComponent,
    CoursesPageComponent
    NumberchangepopupComponent,
    ArticleformComponent,
    CourseCardComponent, 

  ],
  imports: [
    CommonModule,
    SharedModule,
    SubscriberRoutingModule,
    ReactiveFormsModule ,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    FormsModule,
    MatInputModule,
  
    MatMenuModule,
    MatButtonModule,
    MatBadgeModule,
    MatDialogModule,
    MatCardModule,
    MatBadgeModule
  ]
})
export class SubscriberModule { }
