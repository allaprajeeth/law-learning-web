import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { HttpClientModule } from '@angular/common/http';
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
import { ArticleformComponent } from './components/articleform/articleform.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { DeleteaccountComponent } from './components/deleteaccount/deleteaccount.component';
import { PhotoComponent } from './components/photo/photo.component';
import { AccountsecurityComponent } from './components/accountsecurity/accountsecurity.component';
import { ArticlelistHistoryComponent } from './components/articlelist-history/articlelist-history.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { FileSaverModule } from 'ngx-filesaver';
import { ArticleFileComponent } from './components/article-file/article-file.component';

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
       ArticleformComponent,
       SidenavComponent,
       NotificationsComponent,
       PaymentsComponent,
       ContactusComponent,
       DeleteaccountComponent,
       PhotoComponent,
       AccountsecurityComponent,
       ArticlelistHistoryComponent,
       ArticleDetailComponent,
       ArticleFileComponent,
  
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationRoutingModule,
    HttpClientModule,
    FileSaverModule,
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
