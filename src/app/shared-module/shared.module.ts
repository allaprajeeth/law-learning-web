import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './components/footer/footer.component';
import { PublishingcornerComponent } from './components/publishingcorner/publishingcorner.component';
import { FormsModule } from '@angular/forms';
import { SharedoverviewComponent } from './components/sharedoverview/sharedoverview.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { SharedCertificateComponent } from './components/shared-certificate/shared-certificate.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SharedNotificationComponent } from './components/shared-notification/shared-notification.component';
import { LogoutPopupComponent } from './components/logout-popup/logout-popup.component';
import { PublishArticlesComponent } from './components/publish-articles/publish-articles.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ConfirmationAlertComponent } from './components/confirmation-alert/confirmation-alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { SharedcourseHistoryComponent } from './components/sharedcourse-history/sharedcourse-history.component';
import { SharedarticleHistoryComponent } from './components/sharedarticle-history/sharedarticle-history.component';
import { UploadedarticlesstatusComponent } from './components/uploadedarticlesstatus/uploadedarticlesstatus.component';
import { SharedPaginationComponent } from './components/shared-pagination/shared-pagination.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedvideoplayerComponent } from './components/sharedvideoplayer/sharedvideoplayer.component';
import { SharedcourseInfoComponent } from './components/sharedcourse-info/sharedcourse-info.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DurationPipe } from './pipes/duration.pipe';

@NgModule({
  declarations: [
    FooterComponent,
    SharedoverviewComponent,
    PublishingcornerComponent,
    SharedCertificateComponent,
    SharedNotificationComponent,
    LogoutPopupComponent,
    PublishArticlesComponent,
    FileUploadComponent,
    ConfirmationAlertComponent,
    SidenavComponent,
    LogoutPopupComponent,
    PublishArticlesComponent,
    FileUploadComponent,
    ConfirmationAlertComponent,
    SharedcourseHistoryComponent,
    SharedarticleHistoryComponent,
    UploadedarticlesstatusComponent,
    SharedPaginationComponent,
    SharedvideoplayerComponent,
    SharedcourseInfoComponent,
    DurationPipe,
  ],

  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    CarouselModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatExpansionModule,
    MatChipsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    RouterModule,
    MatPaginatorModule,
  ],
  exports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatChipsModule,
    FooterComponent,
    PublishingcornerComponent,
    PublishArticlesComponent,
    FormsModule,
    SharedoverviewComponent,
    SharedCertificateComponent,
    SharedNotificationComponent,
    LogoutPopupComponent,
    FileUploadComponent,
    SidenavComponent,
    RouterModule,
    SharedcourseHistoryComponent,
    SharedarticleHistoryComponent,
    UploadedarticlesstatusComponent,
    SharedPaginationComponent,
    SharedvideoplayerComponent,
    SharedcourseInfoComponent,
    DurationPipe
  ],
})
export class SharedModule {}
