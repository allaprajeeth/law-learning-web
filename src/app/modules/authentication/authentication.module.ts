import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
// import { ComponentsComponent } from './components/components.component';
import { ManagerloginComponent } from './components/managerlogin/managerlogin.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ManagernavComponent } from './components/managernav/managernav.component';

import {MatIconModule} from '@angular/material/icon';
// import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { VideoplayerComponent } from './components/videoplayer/videoplayer.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { TermsandcondiComponent } from './components/termsandcondi/termsandcondi.component';
import { ContentManagerLibraryComponent } from './components/content-manager-library/content-manager-library.component';
import { ArticleComponent } from './components/article/article.component';

@NgModule({
  declarations: [
    // ComponentsComponent,
    ManagerloginComponent,
    HomepageComponent,
    ManagernavComponent,
    CourseInfoComponent,
    VideoplayerComponent,
    AboutusComponent,
    TermsandcondiComponent,
 
    ContentManagerLibraryComponent,
       ArticleComponent,
  
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationRoutingModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatTabsModule,
    

  ]
})
export class AuthenticationModule { }
