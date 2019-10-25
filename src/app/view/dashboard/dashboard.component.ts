import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  instructorsList;
  courseList;

  constructor(public adminService: AdminService) {

    this.adminService.getInstructorsList().subscribe((data: any) => {
      this.instructorsList = data;
      console.log("instructors list", this.instructorsList);
    })
    this.adminService.getCoursesList().subscribe((data:any)=>{
      this.courseList = data;
    })

  }

  ngOnInit() {


  }

}
