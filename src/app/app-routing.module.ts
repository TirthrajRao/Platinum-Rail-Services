import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './view/course/course.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { InstructorComponent } from './view/instructor/instructor.component';
import { JobComponent } from './view/job/job.component';
import { UnauthorisedComponent } from './view/unauthorised/unauthorised.component';
import { AuthGuardService } from '../app/guards/auth-guard.service';
/**
 * routing of all components
 */
const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashBoard',
    pathMatch: 'full'
  },
  {
    path: 'dashBoard',
    component: DashboardComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path: 'course',
    component: CourseComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path: 'instructor',
    component: InstructorComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path: 'jobDetails',
    component: JobComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path: 'unauthorised',
    component: UnauthorisedComponent,
    // canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
