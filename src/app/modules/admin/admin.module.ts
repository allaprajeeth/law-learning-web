import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import {MatBadgeModule} from '@angular/material/badge';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { VideoplayerComponent } from './components/videoplayer/videoplayer.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ErrorHandlerService } from 'src/app/common/services/error-handler/error-handler.service';
import { NotificationComponent } from './components/notification/notification.component';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { TermsandcondiComponent } from './components/termsandcondi/termsandcondi.component';

@NgModule({
  declarations: [
    AdminLoginComponent,
    HomepageComponent,
    AdminnavComponent,
    CourseInfoComponent,
    VideoplayerComponent,
    AboutusComponent,
    NotificationComponent,
    TermsandcondiComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatBadgeModule,
    FormsModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatTabsModule
    
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    },
  ]
})
export class AdminModule { }
