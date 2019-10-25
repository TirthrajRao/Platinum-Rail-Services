import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import * as _ from 'lodash';
declare var $: any;
@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit {
  @Output() courseIndex;
  createInstructorForm: FormGroup;
  modelValues: any;
  instructorList = [];
  allResponse = [];
  instructorHeader = [
    'Sr.No', 'Name', 'Jobs'
  ]
  constructor(public adminService: AdminService) { }

  ngOnInit() {

    this.createInstructorForm = new FormGroup({
      name: new FormControl(this.modelValues ? this.modelValues.name : ''),
      email: new FormControl(this.modelValues ? this.modelValues.email : ''),
      password: new FormControl(this.modelValues ? this.modelValues.password : ''),
      confirmPassword: new FormControl(''),
    });
    this.getInstructorsList();

    $('#modalLoginForm').on('hidden.bs.modal', function () {
      this.modelValues = null
      console.log("value of modal", this.modelValues)
    });
  }

  addNewInstructor() {
    console.log("instructors details", this.createInstructorForm.value);
    this.adminService.createNewInstructor(this.createInstructorForm.value)
    this.createInstructorForm.reset();
    $('#modalLoginForm').modal('toggle'); //or  $('#IDModal').modal('hide');

  }
  updateInstructor(){
    console.log("updated value ", this.createInstructorForm.value);
    this.adminService.updateInstructor(this.createInstructorForm.value)
    $('#modalLoginForm').modal('toggle');
  }
  getInstructorsList() {
    this.adminService.getInstructorsList().subscribe((data: any) => {
      const dataStr = JSON.stringify(data);
      this.allResponse = JSON.parse(dataStr);
      console.log("this.allresponse", this.allResponse)
      _.forEach(data, (val) => {
        delete val.email;
        delete val.password;
        console.log("for loop of user", val)
        this.instructorList.push(Object.values(val));
      })
      console.log("instructors list data", this.instructorList);
    })
  }


  getIndexToEdit(event) {
    console.log('got index in course', event);
    this.modelValues = this.allResponse[event];
    this.createInstructorForm.controls.name.setValue(this.modelValues.instructorName);
    this.createInstructorForm.controls.email.setValue(this.modelValues.email);
    this.createInstructorForm.controls.password.setValue(this.modelValues.password);
    $('#modalLoginForm').modal('show');
  }

  openModal() {
    this.modelValues = null;
    this.createInstructorForm.reset();
    console.log("open modal", this.modelValues, this.createInstructorForm.value)
    $('#modalLoginForm').modal('show');

  }

}
