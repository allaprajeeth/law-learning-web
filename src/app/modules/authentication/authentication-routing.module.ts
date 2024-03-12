import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { TermsandcondiComponent } from './components/termsandcondi/termsandcondi.component';
import { PhotoComponent } from './components/photo/photo.component';
import { AccountsecurityComponent } from './components/accountsecurity/accountsecurity.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { DeleteaccountComponent } from './components/deleteaccount/deleteaccount.component';
import { ArticlelistHistoryComponent } from './components/articlelist-history/articlelist-history.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { CmPostdetailsComponent } from './components/cm-postdetails/cm-postdetails.component';
import {DocumentsComponent} from './../../common/components/documents/documents.component'
import {ArticleComponent} from './../../common/components/article/article.component'
import {AboutusComponent} from './../../common/components/aboutus/aboutus.component'
const routes: Routes = [
  {
    path:"",
    redirectTo: 'homepage',
    pathMatch: 'full'
  },
  {
    path:'homepage',
    component: HomepageComponent
  },
  {
    path:'homepage',
    component: HomepageComponent
  },
  {
    path:'courseInfo',
    component:CourseInfoComponent
  },
  {
    path:'aboutus',
    component:AboutusComponent
  },
  {
    path:'termsandconditions',
    component:TermsandcondiComponent
  },
  {
    path:'library',
    component:DocumentsComponent
  },
  {
   path:'article',
   component:ArticleComponent
  },
  {
    path:"profile",
    component: PhotoComponent
  },
  {
    path:'acSecurity',
    component:AccountsecurityComponent
  },
  {
    path:"notification",
    component: NotificationsComponent
  },
  {
    path:"payments",
    component: PaymentsComponent
  },
  {
    path:"contactus",
    component: ContactusComponent
  },
  {
    path:"articleListHistory",
    component: ArticlelistHistoryComponent
  },
  { path: 'detail-articles/:id', 
  component: ArticleDetailComponent 
},
{
  path: 'publish-articles/:id',
  component: CmPostdetailsComponent
},

//  { path: 'articles/:fileId',
//  component: ArticleDetailComponent },
  
  {
    path:"delete-account",
    component: DeleteaccountComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
