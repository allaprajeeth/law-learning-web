import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  {
    path:"",
    redirectTo: 'login',
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
