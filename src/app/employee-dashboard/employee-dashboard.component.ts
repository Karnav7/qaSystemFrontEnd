import { Component, OnInit } from '@angular/core';
import { CountDown } from 'angular2-simple-countdown/countdown';
import * as moment from 'moment';
import * as yo from 'moment-timer';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {

  countdownTime: Date = new Date();
  x: Date = new Date();

  constructor() { }

  ngOnInit() {
    
    // let startTime = moment().startOf('seconds');
    // console.log('initial', startTime);
    // let counter = 1800;
    // let seconds = 60;
    // let minutes = 30;
    // const k = setInterval(function() {
    //   counter = counter - 1;
      // startTime = moment().add(1, 'second');
      
      // seconds = seconds - 1;
      // if (seconds < 0) {
      //   seconds = 59;
      // }

      // if (seconds === 59 ) {
      //   minutes = minutes - 1;
      // }
      
      // console.log(startTime);
      // console.log(seconds);
      // if ((seconds % 60) === 0)  {
        // startTime = moment().add(1, 'minute').seconds(0);
        // minutes = minutes - 1;
      //   seconds = 0;
      // }
      // document.getElementById('demo').innerHTML = startTime.get('minutes') + 'm ' + startTime.get('seconds') + 's ';
    //   document.getElementById('demo').innerHTML = minutes + 'm ' + seconds + 's ';

    //   if ( counter === 0 ) {
    //     clearInterval(k);
    //     document.getElementById('demo').innerHTML = 'EXPIRED';
    //   }
    // }, 1000);
    
   }
  
}
