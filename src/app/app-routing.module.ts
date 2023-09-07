import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './common/components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './common/components/page-not-found/page-not-found.component';
import { authGuard } from './common/guards/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'instructor',
    loadChildren: () => import('./modules/instructor/instructor.module').then(m => m.InstructorModule)
  },
  {
    path: 'subscriber',
    loadChildren: () => import('./modules/subscriber/subscriber.module').then(m => m.SubscriberModule)
  },
  {
    path: 'reviewer',
    loadChildren: () => import('./modules/reviewer/reviewer.module').then(m => m.ReviewerModule)
  },
  {
    path: '',
    canActivate: [authGuard],
    component: DashboardComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
