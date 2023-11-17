import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { FormsModule } from '@angular/forms';
import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorLoginComponent } from './components/instructor-login/instructor-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InstructornavComponent } from './components/instructornav/instructornav.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CoursesComponent } from './components/courses/courses.component';
import { NotificationComponent } from './components/notification/notification.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { InstructorinfoComponent } from './components/instructorinfo/instructorinfo.component';
import { EditcoursesComponent } from './components/editcourses/editcourses.component';
import { ArticleComponent } from './components/article/article.component';
import { VideoplayerComponent } from './components/videoplayer/videoplayer.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { InstructorSidenavComponent } from './components/instructor-sidenav/instructor-sidenav.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { QuiztestComponent } from './components/quiztest/quiztest.component';
import { UploadComponent } from './components/upload/upload.component';
import { TestpreviewComponent } from './components/testpreview/testpreview.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { SubmitarticlemesgComponent } from './components/submitarticlemesg/submitarticlemesg.component';
import { ArticleformComponent } from './components/articleform/articleform.component';


@NgModule({
  declarations: [
    InstructorLoginComponent,
    InstructornavComponent,
    HomepageComponent,
    CoursesComponent,
    NotificationComponent,
    PublicProfileComponent,
    InstructorinfoComponent,
    EditcoursesComponent,
    ArticleComponent,
    VideoplayerComponent,
    CourseInfoComponent,
    SuccessDialogComponent,
    InstructorSidenavComponent,
    AboutusComponent,
    QuiztestComponent,
    UploadComponent,
    TestpreviewComponent,
    DocumentsComponent,
    SubmitarticlemesgComponent,
    ArticleformComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    InstructorRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTooltipModule,
    MatBadgeModule,
    MatToolbarModule ,
    MatCardModule,
    MatDividerModule,
   MatExpansionModule,
   MatTabsModule,
   MatDialogModule,
   MatSidenavModule,

  ]
})
export class InstructorModule { }
