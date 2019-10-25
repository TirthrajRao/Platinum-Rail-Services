import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Event } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-tabel',
  templateUrl: './tabel.component.html',
  styleUrls: ['./tabel.component.css']
})
export class TabelComponent implements OnInit {
  @Input() coursList;
  @Input() courseHeader;
  @Input() instructorList;
  @Input() instructorHeader;
  @Input() jobList;
  @Input() jobHeader;
  @Output() courseIndex: EventEmitter<any> = new EventEmitter<any>();;
  receviedData;
  headerList = [];
  Page: Number = 1;
  currentUrl;
  isDisplayColor:boolean = false;
  public labels: any = {
    previousLabel: '<'
  }


  constructor(private route: ActivatedRoute, private router: Router) {

    router.events.subscribe((routerEvent: Event) => {
      console.log("frist activate router ", routerEvent)

      this.checkRouterEvent(routerEvent);
    });
  }

  ngOnInit() {

    console.log(this.instructorList, this.coursList, this.jobList)
    this.getDetails()
    $('li').click(function () {
      $(this).addClass('active').siblings().removeClass('active');
    });
  }
  getDetails() {
    if (this.currentUrl == '/jobDetails') {
      this.receviedData = this.jobList;
      this.headerList = this.jobHeader;
      
    }
    if (this.currentUrl == '/course') {
      this.receviedData = this.coursList;
      this.headerList = this.courseHeader;
      this.isDisplayColor = true;
    }
    if (this.currentUrl == '/instructor') {
      this.receviedData = this.instructorList;
      this.headerList = this.instructorHeader;
      this.isDisplayColor = true;
    }

    console.log("course Detaoils", this.receviedData);
  }
  checkRouterEvent(event) {
    console.log("current url", event.url);
    this.currentUrl = event.url
  }
  editCourseOrInstructor(data) {
    console.log("edit events", data)
    this.courseIndex.emit(data);
  }
}
