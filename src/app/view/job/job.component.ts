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

    $('input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea').each(function (element, i) {
      if ((element.value !== undefined && element.value.length > 0) || $(this).attr('placeholder') !== null) {
        $(this).siblings('label').addClass('active');
      }
      else {
        $(this).siblings('label').removeClass('active');
      }
    });
    // this.getJobFrom()
    this.createNewJobForm = new FormGroup({
      clientName: new FormControl(this.modelValues ? this.modelValues.client : ''),
      location: new FormControl(this.modelValues ? this.modelValues.location : ''),
      instructor: new FormControl(this.modelValues ? this.modelValues.instructor : ''),
      course: new FormControl(this.modelValues ? this.modelValues.course : ''),
      startingDate: new FormControl(this.modelValues ? this.modelValues.startingDate : ''),
      frequency: this.fb.array([])
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

  // initJob(data?){
  //   this.createNewJobForm = new FormGroup({
  //     clientName: new FormControl(this.modelValues ? this.modelValues.client : ''),
  //     location: new FormControl(this.modelValues ? this.modelValues.location : ''),
  //     instructor: new FormControl(this.modelValues ? this.modelValues.instructor : ''),
  //     course: new FormControl(this.modelValues ? this.modelValues.course : ''),
  //     startingDate: new FormControl(this.modelValues ? this.modelValues.startingDate : ''),
  //     frequency: this.fb.array(this.weekArray(data))
  //   });
  // }


  // weekArray(details) {
  //   console.log("details of checkbox", details)
  //   if (details) {
  //     let weekArray = [];
  //     for (let i = 0; i < details.length; i++) {
  //       if (details[i]) {
  //         weekArray.push(this.fb.group({
  //           frequencyName: new FormControl(details[i])
  //         }))
  //       }
  //     }
  //     console.log("hellllllloooooooo", this.createNewJobForm)
  //     return weekArray;

  //   }
  //   else {
  //     return this.fb.group({
  //       frequencyName: new FormControl(details)
  //     })
  //   }
  // }

  // getJobFrom(createdActivity?) {
  //   console.log("update activity details", createdActivity);
  //   this.createNewJobForm = new FormGroup({
  //     clientName: new FormControl(this.modelValues ? this.modelValues.client : ''),
  //     location: new FormControl(this.modelValues ? this.modelValues.location : ''),
  //     instructor: new FormControl(this.modelValues ? this.modelValues.instructor : ''),
  //     course: new FormControl(this.modelValues ? this.modelValues.course : ''),
  //     startingDate: new FormControl(this.modelValues ? this.modelValues.startingDate : ''),
  //     frequency: this.fb.array(this.weekArray(createdActivity))
  //   })
  // }

  /**
   * @param {String} activities
   *  To create new activity
   */
  // weekArray(activities?: any[]) {
  //   console.log("activities", activities);
  //   if (!activities) {
  //     return [this.fb.group({
  //       frequencyName: new FormControl(''),
  //     })]
  //   }
  //   /**
  //    * To edit created activities
  //    */

  //   let actArray = [];
  //   for (let i = 0; i < activities.length; i++) {
  //     actArray.push(this.fb.group({
  //       frequencyName: new FormControl(activities[i]),
  //     }))
  //   }
  //   console.log("helllllllllll------", actArray)
  //   return actArray;
  // }




  getInstructorsList() {
    this.adminService.getInstructorsList().subscribe((data: any) => {
      this.listOfInstructor = data;
      console.log('this.listOfInstructor', this.listOfInstructor);
    })
  }

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



  selectFreequncy(isChecked, day) {
    console.log("selected days", day)
    if (isChecked == true) {
      this.selectedDays.push(day);
      console.log("selected week days", this.selectedDays)
      // this.getJobFrom(this.selectedDays);
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
  }

  getCourseList() {
    this.adminService.getCoursesList().subscribe((data: any) => {
      this.listOfCourse = data;
      console.log('this.listOfCourse', this.listOfCourse);
    })
  }

  getJobList() {
    this.adminService.getJobList().subscribe((data: any) => {
      const dataStr = JSON.stringify(data);
      this.allResponse = JSON.parse(dataStr);
      _.forEach(data, (val) => {
        delete val.startingDate
        delete val.frequency
        delete val.dateArray
        this.jobList.push(Object.values(val));
      })
    })
  }

  addNewJob() {
    let checked = $('input[name="materialExampleRadios"]:checked').val();
    console.log("checked value", checked)
    // this.createNewJobForm.controls.frequency.setValue(this.selectedDays);
    this.startingDateValue = this.createNewJobForm.controls.startingDate.setValue($('#startDate').val());
    console.log("create new job details", this.createNewJobForm.value)
    $('#modalLoginForm').modal('toggle');
    this.createNewJobForm.reset();
  }

  getIndexToEdit(event) {
    console.log('got index in course', event);
    this.modelValues = this.allResponse[event];
    console.log("modalvalues===========>", this.modelValues)
    // _.forEach(this.modelValues.frequency ,(data)=>{
    //   console.log("frewuency data", data)
    // })
    this.frequencyName = this.modelValues.frequency
    this.singleInstructorName = this.modelValues.instructor;
    this.singleCourseName = this.modelValues.course
    console.log(this.frequencyName);
    _.forEach(this.weekDays, (day, index) => {
      // console.log(day);
      _.forEach(this.frequencyName, (selectDay) => {
        // console.log(selectDay);
        if (day.name == selectDay) {
          this.weekDays[index]['selected'] = 'true'
        }
        // else{
        //   this.weekDays[index]['selected'] ='false'
        // }
      })
    })
    console.log("key set====>", this.weekDays)
    // this.getJobFrom(this.frequencyName)
    // this.createNewJobForm.controls.frequency.setValue(this.modelValues.frequency)
    this.createNewJobForm.controls.clientName.setValue(this.modelValues.client);
    this.createNewJobForm.controls.location.setValue(this.modelValues.location);
    this.createNewJobForm.controls.startingDate.setValue(this.modelValues.startingDate);

    // this.createCourseForm.controls.duration.setValue(this.modelValues.duration);
    $('#modalLoginForm').modal('show');
  }


  openModal() {
    this.modelValues = null;
    this.createNewJobForm.reset();
    console.log("open modal", this.modelValues, this.createNewJobForm.value)
    $('#modalLoginForm').modal('show');
  }
}




// const weekArray = <FormArray>this.createNewJobForm.controls.frequency;
//     if (isChecked) {
//       weekArray.push(new FormControl(day))
//     }
//     else {
//       weekArray.push(new FormControl(''))
//     }

 // maleItemArray(details?): any {
  //   if (details) {
  //     let maleArray = [];
  //     for (let i = 0; i < details.length; i++) {
  //       if (details[i].itemGender === 'male') {
  //         maleArray.push(this.fb.group({
  //           itemId: new FormControl(details[i]._id),
  //           itemName: new FormControl(details[i].itemName),
  //           itemType: new FormControl(details[i].itemType),
  //           itemPrice: new FormControl(details[i].itemPrice)
  //         }))
  //       }
  //     }
  //     return maleArray;
  //   } else {
  //     return this.fb.group({
  //       itemName: new FormControl(''),
  //       itemType: new FormControl(''),
  //       itemPrice: new FormControl('')
  //     })
  //   }
  // }