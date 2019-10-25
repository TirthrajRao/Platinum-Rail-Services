import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  instructorList
  courseList;
  countList
  constructor() { }

  /**
   * get all instructors list
   */
  getInstructorsList() {
    return new Observable(observer => {
      this.instructorList = [
        {
          instructorName: "Alex Pedley",
          jobs: "7",
          email: "alex@gmail.com",
          password: "123456"
        }, {
          instructorName: "Chris wood",
          jobs: "10",
          email: "alex@gmail.com",
          password: "123456"
        }, {
          instructorName: "Sarah Wells",
          jobs: "0",
          email: "alex@gmail.com",
          password: "123456"
        },
        {
          instructorName: "Leam Brennan",
          jobs: "13",
          email: "alex@gmail.com",
          password: "123456"
        }
      ]
      observer.next(this.instructorList);
      observer.complete();
    });
  }

  /**
   * get total counts of jobs,instructors and courses 
   */
  getAllcount(){
    return new Observable(observer => {
      this.countList = [
        {
          totalJobs: "246",
          totalCourse: "15",
          totalInstructors: "5",
        }
      ]
      observer.next(this.countList);
      observer.complete();
    });
  }

  /**
   * get course list
   */
  getCoursesList() {
    return new Observable(observer => {
      this.courseList = [
        {
          courseName: "First Aid/E-learning",
          duration: "24"
        }, {
          courseName: "L3 W11",
          duration: "1"
        }, {
          courseName: "Rail Saw",
          duration: "12"
        },
        {
          courseName: "IAG",
          duration: "5"
        }
      ]
      observer.next(this.courseList);
      observer.complete();
    });
  }

  /**
   * get all job list
   */
  getJobList() {
    return new Observable(observer => {
      this.courseList = [
        {
          client: "SCUK",
          location: "HMP Kirkham",
          instructor: "Alex Pedley",
          course: "First Aid/E-learning",
          startingDate: "5-11-2019",
          frequency: ['Monday', 'Tuesday', 'Wednesday'],
          allDatesOfDay: ["2019-10-28", "2019-11-04", "2019-11-11", "2019-11-18", "2019-11-25", "2019-12-02", "2019-12-09", "2019-12-16", "2019-12-23", "2019-12-30", "2020-01-06", "2020-01-13", "2020-01-20", "2020-01-27", "2020-02-03", "2020-02-10", "2020-02-17", "2020-02-24", "2020-03-02", "2020-03-09", "2020-03-16", "2020-03-23", "2020-03-30", "2020-04-06"]
        },
        {
          client: "Shipley",
          location: "Leeds",
          instructor: "Leam Brennan",
          course: "L3 W11"
        },
        {
          client: "FOC",
          location: "Elsecar",
          instructor: "Chris wood",
          course: "Rail Saw"
        },
        {
          client: "Shipley",
          location: "Shipley",
          instructor: "Sarah Wells",
          course: "IAG"
        }


      ]
      observer.next(this.courseList);
      observer.complete();
    });
  }

  /**
   * @param data create new course
   */
  createNewCourse(data) {
    console.log("new course service response", data)
  }

  /**
   * @param data update course
   */
  updateCourse(data) {
    console.log("update course data in service ", data)
  }


  /**
   * @param data create new instructor
   */
  createNewInstructor(data) {
    console.log("new instructor details", data);
  }


  /**
   * @param data update instructor
   */
  updateInstructor(data) {
    console.log("update instructors list data in service", data)
  }


  /**
   * 
   * @param data add new job
   */
  addJob(data) {
    console.log("create new job in service data", data)
  }

  /**
   * 
   * @param data update job
   */
  updateJob(data) {
    console.log("update job in service data", data)
  }
}

