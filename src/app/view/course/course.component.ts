import { Component, OnInit, Output, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { EventEmitter } from 'events';
declare var $: any;
import * as _ from 'lodash';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @Output() courseIndex;
  courseList = [];
  createCourseForm: FormGroup;
  courseHeader = [
    'Sr.No', 'Title', 'Duration(Days)'
  ]
  allResponse = [];
  modelValues: any = null;

  constructor(public adminService: AdminService) {

  }

  ngOnInit() {

    /**
     * create New Form
     */
    this.createCourseForm = new FormGroup({
      courseName: new FormControl(this.modelValues ? this.modelValues.courseName : ''),
      duration: new FormControl(this.modelValues ? this.modelValues.duration : '')
    });
    this.getCourseList()


    /**
     * model value reset after modal close
     */
    $('#modalLoginForm').on('hidden.bs.modal', function () {
      this.modelValues = null
      console.log("value of modal", this.modelValues)
    });
  }

  /**
   * Get course list 
   */
  getCourseList() {
    this.adminService.getCoursesList().subscribe((data: any) => {
      const dataStr = JSON.stringify(data);
      this.allResponse = JSON.parse(dataStr);
      _.forEach(data, (val) => {
        this.courseList.push(Object.values(val));
      })
      console.log("course list data", this.courseList)
    })
  }

  /**
   * Add new course 
   */
  addNewCourse() {
    console.log("new course details", this.createCourseForm.value)
    this.adminService.createNewCourse(this.createCourseForm.value)
    this.createCourseForm.reset();
    $('#modalLoginForm').modal('toggle');
  }

  /**
   * Update course details
   */
  updateCourse() {
    this.adminService.updateCourse(this.createCourseForm.value)
    $('#modalLoginForm').modal('toggle');
  }

  /**
   * @param event get index of single element
   * get index and display details
   */
  getIndexToEdit(event) {
    console.log('got index in course', event);
    this.modelValues = this.allResponse[event];
    console.log("modalvalues===========>", this.modelValues)
    this.createCourseForm.controls.courseName.setValue(this.modelValues.courseName);
    this.createCourseForm.controls.duration.setValue(this.modelValues.duration);
    $('#modalLoginForm').modal('show');
  }

  /**
   * open modal
   */
  openModal() {
    this.modelValues = null;
    this.createCourseForm.reset();
    console.log("open modal", this.modelValues, this.createCourseForm.value)
    $('#modalLoginForm').modal('show');
  }
}
