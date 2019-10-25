import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './theme/sidebar/sidebar.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { CourseComponent } from './view/course/course.component';
import { InstructorComponent } from './view/instructor/instructor.component';
import { JobComponent } from './view/job/job.component';
import { UnauthorisedComponent } from './view/unauthorised/unauthorised.component';
import { TabelComponent } from './view/tabel/tabel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    CourseComponent,
    InstructorComponent,
    JobComponent,
    UnauthorisedComponent,
    TabelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
