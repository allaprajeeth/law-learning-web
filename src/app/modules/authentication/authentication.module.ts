import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared-module/shared.module';

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


@NgModule({
  declarations: [
    // ComponentsComponent,
    ManagerloginComponent,
    HomepageComponent,
    ManagernavComponent
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
    MatButtonModule

  ]
})
export class AuthenticationModule { }
