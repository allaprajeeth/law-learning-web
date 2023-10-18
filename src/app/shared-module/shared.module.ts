import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasePageComponent } from './components/base-page/base-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './components/footer/footer.component';
// import { InstructorLoginComponent } from '../modules/instructor/components/instructor-login/instructor-login.component';


@NgModule({
  declarations: [BasePageComponent, FooterComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    CommonModule,
    BasePageComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FooterComponent
    // InstructorLoginComponent
  ]

})
export class SharedModule { }
