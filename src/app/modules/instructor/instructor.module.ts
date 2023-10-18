import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared-module/shared.module';

import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorLoginComponent } from './components/instructor-login/instructor-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InstructornavComponent } from './components/instructornav/instructornav.component';

import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';
import { HomepageComponent } from './components/homepage/homepage.component';

import { CoursesComponent } from './components/courses/courses.component';

@NgModule({
  declarations: [
    InstructorLoginComponent,
    InstructornavComponent,
    HomepageComponent,
    CoursesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    InstructorRoutingModule,
    ReactiveFormsModule,
    
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatTooltipModule,
    MatBadgeModule
  ]
})
export class InstructorModule { }
