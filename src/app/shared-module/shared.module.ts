import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasePageComponent } from './components/base-page/base-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './components/footer/footer.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { PublishingcornerComponent } from './components/publishingcorner/publishingcorner.component';
// import { InstructorLoginComponent } from '../modules/instructor/components/instructor-login/instructor-login.component';
import { FormsModule } from '@angular/forms';
import { SharedoverviewComponent } from './components/sharedoverview/sharedoverview.component';
import {  MatDividerModule } from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { SharedaboutusComponent } from './components/sharedaboutus/sharedaboutus.component';
import { CarouselModule } from 'primeng/carousel';
@NgModule({
  declarations: [BasePageComponent, FooterComponent, SharedoverviewComponent, DocumentsComponent, PublishingcornerComponent, SharedaboutusComponent],
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
    CarouselModule
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
    SharedaboutusComponent
    // InstructorLoginComponent
  ]

})
export class SharedModule { }
