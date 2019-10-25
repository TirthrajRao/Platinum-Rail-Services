import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  instructorsList;
  courseList;
  allCounts;
  @Output() dashBoardIndex: EventEmitter<any> = new EventEmitter<any>();;
  constructor(public adminService: AdminService) {

    /**
     * get instructorsList
     */
    this.adminService.getInstructorsList().subscribe((data: any) => {
      this.instructorsList = data;
      console.log("instructors list", this.instructorsList);
    })
    /**
     * get course lisr
     */
    this.adminService.getCoursesList().subscribe((data: any) => {
      this.courseList = data;
    })
    /**
     * get all count
     */
    this.adminService.getAllcount().subscribe((data: any) => {
      this.allCounts = data;
      console.log(this.allCounts);
    })

  }

  ngOnInit() {


  }
}
