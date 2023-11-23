import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasePageComponent } from './components/base-page/base-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './components/footer/footer.component';
import { PublishingcornerComponent } from './components/publishingcorner/publishingcorner.component';
import { FormsModule } from '@angular/forms';
import { SharedoverviewComponent } from './components/sharedoverview/sharedoverview.component';
import {  MatDividerModule } from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedaboutusComponent } from './components/sharedaboutus/sharedaboutus.component';
import { CarouselModule } from 'primeng/carousel';
import { SharedphotoComponent } from './components/sharedphoto/sharedphoto.component';
import { SharedaccountsecurityComponent } from './components/sharedaccountsecurity/sharedaccountsecurity.component';
import { SharednotificationsComponent } from './components/sharednotifications/sharednotifications.component';
import { SharedcontactusComponent } from './components/sharedcontactus/sharedcontactus.component';
import { ShareddeleteAccountComponent } from './components/shareddelete-account/shareddelete-account.component';
import { LibraryComponent } from './components/library/library.component';
import { SharedarticleformComponent } from './components/sharedarticleform/sharedarticleform.component';
import { SharedpostdetailsComponent } from './components/sharedpostdetails/sharedpostdetails.component';

@NgModule({
 
  declarations: [
    BasePageComponent,
    FooterComponent,
     SharedoverviewComponent, 
    PublishingcornerComponent,
     SharedaboutusComponent,
     SharedphotoComponent,
     SharedaccountsecurityComponent,
     SharednotificationsComponent,
     SharedcontactusComponent,
     ShareddeleteAccountComponent,
     LibraryComponent,
     SharedarticleformComponent,
     SharedpostdetailsComponent,
    ],

  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    CarouselModule,
    MatSidenavModule,
    MatSlideToggleModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    BasePageComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FooterComponent,
    PublishingcornerComponent,
    FormsModule,
    SharedoverviewComponent,
    SharedaboutusComponent,
    SharedphotoComponent,
    SharedaccountsecurityComponent,
    SharednotificationsComponent,
    SharedcontactusComponent,
    ShareddeleteAccountComponent,
    LibraryComponent,
    SharedarticleformComponent,
    SharedpostdetailsComponent

  ]

})
export class SharedModule { }
