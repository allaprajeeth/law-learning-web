import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { SubscriberRoutingModule } from './subscriber-routing.module';
import { CartComponent } from './components/cart/cart.component';
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
import { PaymentsComponent } from './components/payments/payments.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { EditEmailComponent } from './components/edit-email/edit-email.component';
import { MyDirectiveDirective } from './components/my-directive.directive';
import { NotificationComponent } from './components/notification/notification.component';
import { CoursesPageComponent } from 'src/app/common/components/courses-page/courses-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CarouselModule } from 'primeng/carousel';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SubmitmesgComponent } from './components/submitmesg/submitmesg.component';
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
import { StatusarticlepageComponent } from './components/statusarticlepage/statusarticlepage.component';
import { UnderreviewarticleComponent } from './components/underreviewarticle/underreviewarticle.component';
import { CommentedarticleComponent } from './components/commentedarticle/commentedarticle.component';


@NgModule({
  declarations: [
    CartComponent,
    PaymentsComponent,
    HomepageComponent,
    EditEmailComponent,
    MyDirectiveDirective,
    NotificationComponent,
    CoursesPageComponent,
    CheckoutComponent,
    SubmitmesgComponent,
    ArticleHistoryComponent,
    SuccessmesgComponent,
    VideoplayerSubscriberComponent,
    CourseInfoComponent,
    OverviewComponent,
    RatingsComponent,
    SubscriberpostdetailsComponent,
    StatusarticlepageComponent,
    UnderreviewarticleComponent,
    CommentedarticleComponent,
   

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

  ],


})
export class SubscriberModule { }
