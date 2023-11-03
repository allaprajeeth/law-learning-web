import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  {
    path:"",
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:"login",
    component: AdminLoginComponent
  },
  {
    path:"adminnav",
    component: AdminnavComponent
  },
  {
    path:"homepage",
    component: HomepageComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
