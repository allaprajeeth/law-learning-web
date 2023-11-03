import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';

import {MatBadgeModule} from '@angular/material/badge';
import { FormsModule } from '@angular/forms';

import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    AdminLoginComponent,
    HomepageComponent,
    AdminnavComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatBadgeModule,
    FormsModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule
    
  ]
})
export class AdminModule { }
