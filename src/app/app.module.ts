import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavComponent } from './common/components/nav/nav.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplashScreenComponent } from './common/components/splash-screen/splash-screen.component';
import { HeaderComponent } from './common/components/header/header.component';
import { SharedModule } from './shared-module/shared.module';
import { DashboardComponent } from './common/components/dashboard/dashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './common/services/http-interceptor/http-interceptor.service';
import { ErrorHandlerService } from './common/services/error-handler/error-handler.service';
import { LoadingComponent } from './common/components/loading/loading.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { FirstnavComponent } from './common/components/firstnav/firstnav.component';
import { RegisterComponent } from './common/components/register/register.component';
import { HomepageComponent } from './common/components/homepage/homepage.component';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleComponent } from './common/components/article/article.component';
import { DocumentsComponent } from './common/components/documents/documents.component';
import { CoursesComponent } from './common/components/courses/courses.component';
import { SubscriberRoutingModule } from './modules/subscriber/subscriber-routing.module';
import { LogoutComponent } from './common/components/logout/logout.component';
import { UploadComponent } from './common/components/upload/upload.component';
import { FileUploadModule } from 'ng2-file-upload';
import { PopupService } from 'src/popup.service';
import { PasswordComponent } from './common/components/password/password.component';
import { VideoplayerComponent } from './common/components/videoplayer/videoplayer.component';
import { VideoplayerNavbarComponent } from './common/components/videoplayer-navbar/videoplayer-navbar.component';
import { RatingsComponent } from './common/components/ratings/ratings.component';
import { OverviewComponent } from './common/components/overview/overview.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CertificateComponent } from './common/components/certificate/certificate.component';
import { LoginComponent } from './common/components/login/login.component';
import { ModalComponent } from './common/components/modal/modal.component';
import { CourseInfoComponent } from './common/components/course-info/course-info.component';
import { FreecourseComponent } from './common/components/freecourse/freecourse.component';
import { AboutusComponent } from './common/components/aboutus/aboutus.component';
import { PhonepasswordComponent } from './common/components/phonepassword/phonepassword.component';
import { TermsandconComponent } from './common/termsandcon/termsandcon.component';
import { CarouselModule } from 'primeng/carousel';
import { OverviewFreecourseComponent } from './common/components/overview-freecourse/overview-freecourse.component';
import { PostdetailComponent } from './common/components/postdetail/postdetail.component';
import { ContactusComponent } from './common/components/contactus/contactus.component';


@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    HeaderComponent,
    DashboardComponent,
    LoadingComponent,
    NavComponent,
    FirstnavComponent,
    RegisterComponent,
    HomepageComponent,
    ArticleComponent,
    DocumentsComponent,
    CoursesComponent,
    LogoutComponent,
    UploadComponent,
    PasswordComponent,
    VideoplayerComponent,
    VideoplayerNavbarComponent,
    RatingsComponent,
    OverviewComponent,
    CertificateComponent,
    LoginComponent,
    ModalComponent,
    CourseInfoComponent,
    PhonepasswordComponent,
    FreecourseComponent,
    AboutusComponent,
    PhonepasswordComponent,
    TermsandconComponent,
    OverviewFreecourseComponent,
    PostdetailComponent,  
    OverviewFreecourseComponent,  
    OverviewFreecourseComponent,
    ContactusComponent,
  ],
  imports: [
    CarouselModule,
    MatSnackBarModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    SubscriberRoutingModule,
    AngularEditorModule,
   
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatButtonModule,
    FileUploadModule,
  ],
  providers: [PopupService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
      
    },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
