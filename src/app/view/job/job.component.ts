import { Component, Output, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormGroup, Validators, FormControl, FormArray, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
declare var $: any;

import * as moment from 'moment'; // add this 1 of 4
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  @Output() courseIndex;
  createNewJobForm: FormGroup;
  selectedCourse;
  listOfInstructor;
  singleInstructorName;
  singleCourseName;
  frequencyName: any = [];
  selectedDays: any = [];
  startingDateValue: any;
  endingDateValue: Date;
  listOfCourse;
  allDatesOfDay;
  modelValues: any = null;
  allResponse = []
  jobList = [];
  jobHeader = [
    'Sr.No', 'Client', 'Location', 'Instructor', 'Course'
  ]
  weekDays = [
    { name: "Monday", id: 0 },

    { name: "Tuesday", id: 1 },

    { name: "Wednesday", id: 2 },

    { name: "Thrusday", id: 3 },

    { name: "Friday", id: 4 },

    { name: "Saturday", id: 5 },

    { name: "Sunday", id: 6 }
  ]

  constructor(public adminService: AdminService, private fb: FormBuilder) { }

  ngOnInit() {


    // this.getJobFrom()
    this.createNewJobForm = new FormGroup({
      clientName: new FormControl(this.modelValues ? this.modelValues.client : ''),
      location: new FormControl(this.modelValues ? this.modelValues.location : ''),
      instructor: new FormControl(this.modelValues ? this.modelValues.instructor : ''),
      course: new FormControl(this.modelValues ? this.modelValues.course : ''),
      startingDate: new FormControl(this.modelValues ? this.modelValues.startingDate : ''),
      frequency: this.fb.array([]),
      allDatesOfDay:new FormControl('')
    });

    this.getJobList();
    this.getInstructorsList();
    this.getCourseList();
  
    $('#startDate').pickadate({
      onSet: function (date1) {
        this.startingDateValue = $('#startDate').val();
        console.log("startDate", this.startingDateValue);
      }
    })
    $('#modalLoginForm').on('hidden.bs.modal', function () {
      this.modelValues = null
      console.log("value of modal", this.modelValues)
    });

  }

  /**
   * Details of instructors
   */
  getInstructorsList() {
    this.adminService.getInstructorsList().subscribe((data: any) => {
      this.listOfInstructor = data;
      console.log('this.listOfInstructor', this.listOfInstructor);
    })
  }

  /**
   * @param event change event of select course
   * get course name and find duration of that course 
   */
  selectHandlerChange(event) {
    let course
    course = event.target.value
    _.forEach(this.listOfCourse, (data) => {
      console.log("all course list", data)
      if (data.courseName == course) {
        this.selectedCourse = data.duration;
      }
    })
    console.log("selected course", this.selectedCourse)
  }



  /**
   * @param isChecked selected value is true or false
   * @param day selected days list
   * display selected day all dates
   */
  selectFreequncy(isChecked, day) {
    console.log("selected days", day)
    if (isChecked == true) {
      this.selectedDays.push(day);
      console.log("selected week days", this.selectedDays)
    }
    else {
      console.log(this.selectedDays.indexOf(day));
      this.selectedDays.splice(this.selectedDays.indexOf(day), 1);
    }
    const weekArray = <FormArray>this.createNewJobForm.controls.frequency;
    if (isChecked) {
      weekArray.push(new FormControl(day))
    }
    else {
      weekArray.push(new FormControl(''))
    }

    var startdate = this.startingDateValue;
    var count = 0;
    var alldates = [];
    var count = 0;
    var i = 0;
    while (count < this.selectedCourse) {
      var abc: any = moment(this.startingDateValue).add(i, 'days')
      var test: any = moment(abc._d, "YYYY-MM-DD HH:MM:ss").format('dddd')
      if (this.selectedDays.includes(test.toString())) {
        alldates.push(moment(abc._d, "YYYY-MM-DD HH:MM:ss").format('YYYY-MM-DD'))
        count++;
        i++
      }
      else {
        i++
      }

    }
    this.allDatesOfDay = alldates;
    this.createNewJobForm.controls.allDatesOfDay.setValue(this.allDatesOfDay);
    _.forEach(this.allDatesOfDay,(date,index)=>{
      console.log("index of date", index)
      $('#selectedDate' + index).pickadate()
    })
    console.log("form===========>",this.createNewJobForm.value)
  }
  /**
   * get all list of course
   */
  getCourseList() {
    this.adminService.getCoursesList().subscribe((data: any) => {
      this.listOfCourse = data;
      console.log('this.listOfCourse', this.listOfCourse);
    })
  }

  /**
   * get list of jobs
   */
  getJobList() {
    this.adminService.getJobList().subscribe((data: any) => {
      const dataStr = JSON.stringify(data);
      this.allResponse = JSON.parse(dataStr);
      _.forEach(data, (val) => {
        delete val.startingDate
        delete val.frequency
        delete val.dateArray
        delete val.allDatesOfDay
        this.jobList.push(Object.values(val));
      })
    })
  }
  /**
   * add new job 
   */
  addNewJob() {
    this.startingDateValue = this.createNewJobForm.controls.startingDate.setValue($('#startDate').val());
    console.log("create new job details", this.createNewJobForm.value)
    // let checked = $('input[name="materialExampleRadios"]:checked').val();
    // console.log("checked value", checked)
    this.adminService.addJob(this.createNewJobForm.value)
    $('#modalLoginForm').modal('toggle');
    this.createNewJobForm.reset();
  }

  updateJob(){
    this.adminService.updateJob(this.createNewJobForm.value)
    $('#modalLoginForm').modal('toggle');

  }

  /**
   * @param event get index of edit element
   * get index value and open edit modal
   */
  getIndexToEdit(event) {
    console.log('got index in course', event);
    this.modelValues = this.allResponse[event];
    console.log("modalvalues===========>", this.modelValues);
    this.allDatesOfDay = this.modelValues.allDatesOfDay;
    this.frequencyName = this.modelValues.frequency
    this.singleInstructorName = this.modelValues.instructor;
    this.singleCourseName = this.modelValues.course
    console.log(this.frequencyName);
    _.forEach(this.weekDays, (day, index) => {
      _.forEach(this.frequencyName, (selectDay) => {
        if (day.name == selectDay) {
          this.weekDays[index]['selected'] = 'true'
        }
      })
    })
    console.log("key set====>", this.weekDays)
    this.createNewJobForm.controls.clientName.setValue(this.modelValues.client);
    this.createNewJobForm.controls.location.setValue(this.modelValues.location);
    this.createNewJobForm.controls.startingDate.setValue(this.modelValues.startingDate);
    $('#modalLoginForm').modal('show');
  }

  /**
   * open modal
   */
  openModal() {
    this.modelValues = null;
    this.createNewJobForm.reset();
    console.log("open modal", this.modelValues, this.createNewJobForm.value)
    $('#modalLoginForm').modal('show');
  }
}