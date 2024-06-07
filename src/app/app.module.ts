import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './common/components/header/header.component';
import { SharedModule } from './shared-module/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './common/services/http-interceptor/http-interceptor.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FirstnavComponent } from './common/components/firstnav/firstnav.component';
import { RegisterComponent } from './common/components/register/register.component';
import { HomepageComponent } from './common/components/homepage/homepage.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleComponent } from './common/components/article/article.component';
import { SubscriberRoutingModule } from './modules/subscriber/subscriber-routing.module';
import { FileUploadModule } from 'ng2-file-upload';
import { PopupService } from 'src/popup.service';
import { VideoplayerComponent } from './common/components/videoplayer/videoplayer.component';
import { OverviewComponent } from './common/components/overview/overview.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { LoginComponent } from './common/components/login/login.component';
import { CourseInfoComponent } from './common/components/course-info/course-info.component';
import { FreecourseComponent } from './common/components/freecourse/freecourse.component';
import { AboutusComponent } from './common/components/aboutus/aboutus.component';
import { TermsandconComponent } from './common/termsandcon/termsandcon.component';
import { CarouselModule } from 'primeng/carousel';
import { OverviewFreecourseComponent } from './common/components/overview-freecourse/overview-freecourse.component';
import { ContactusComponent } from './common/components/contactus/contactus.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ForgotPhonenoComponent } from './common/components/forgot-phoneno/forgot-phoneno.component';
import { ForgotEmailComponent } from './common/components/forgot-email/forgot-email.component';
import { LogoutService } from './common/services/logout.service';
import { PostdetailComponent } from './common/components/postdetail/postdetail.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { EmailVerificationComponent } from './common/components/email-verification/email-verification.component';
import { PhoneVerificationComponent } from './common/components/phone-verification/phone-verification.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdvisorDetailsComponent } from './common/components/advisor-details/advisor-details.component';
import { ErrorHandlerService } from './common/services/error-handler/error-handler.service';
import { ArticleFormComponent } from './common/components/article-form/article-form.component';
import { ProfileComponent } from './common/components/profile/profile.component';
import { AccountsecurityComponent } from './common/components/accountsecurity/accountsecurity.component';
import { SidenavContactusComponent } from './common/components/sidenav-contactus/sidenav-contactus.component';
import { TermsconditionsComponent } from './common/components/termsconditions/termsconditions.component';
import { SidenavtermsconditionsComponent } from './common/components/sidenavtermsconditions/sidenavtermsconditions.component';
import { LibraryComponent } from './common/components/library/library.component';
import { MatListModule } from '@angular/material/list';

import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { LibraryByIdComponent } from './common/components/library-by-id/library-by-id.component';
import { RevertDeleteComponent } from './common/components/revert-delete/revert-delete.component';
import { DeleteAccountComponent } from './common/components/delete-account/delete-account.component';
import { ArticleDetailsComponent } from './common/components/article-details/article-details.component';
import { DeleteAccountDialogComponent } from './common/components/login/delete-account-dialog/delete-account-dialog.component';
import { LoadingInterceptor } from './common/services/loading.interceptor';
import { LoadingComponent } from './common/components/loading/loading.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FirstnavComponent,
    RegisterComponent,
    HomepageComponent,
    ArticleComponent,
    VideoplayerComponent,
    OverviewComponent,
    LoginComponent,
    CourseInfoComponent,
    FreecourseComponent,
    AboutusComponent,
    TermsandconComponent,
    OverviewFreecourseComponent,
    ContactusComponent,
    ForgotPhonenoComponent,
    ForgotEmailComponent,
    AdvisorDetailsComponent,
    PostdetailComponent,
    EmailVerificationComponent,
    PhoneVerificationComponent,
    ArticleFormComponent,
    ProfileComponent,
    AccountsecurityComponent,
    SidenavContactusComponent,
    TermsconditionsComponent,
    SidenavtermsconditionsComponent,
    LibraryComponent,
    ConfirmationDialogComponent,
    LibraryByIdComponent,
    RevertDeleteComponent,
    DeleteAccountComponent,
    ArticleDetailsComponent,
    DeleteAccountDialogComponent,
    LoadingComponent,
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
    MatListModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FileUploadModule,
    PdfViewerModule,
    MatProgressSpinnerModule
  ],
  exports: [RevertDeleteComponent],

  providers: [
    PopupService,
    LogoutService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
