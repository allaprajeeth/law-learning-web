import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorLoginComponent } from './components/instructor-login/instructor-login.component';
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import { HomepageComponent } from './components/homepage/homepage.component';

import { CoursesComponent } from './components/courses/courses.component';

const routes: Routes = [
  {
    path:"",
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:"login",
    component: HeaderComponent
  },
  {
    path:"homepage",
    component: HomepageComponent
  },
  
  {path:"courses",
component:CoursesComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }
