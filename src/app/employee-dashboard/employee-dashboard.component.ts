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
    let counter = 1800;
    let seconds = 60;
    let minutes = 30;
    const k = setInterval(function() {
      counter = counter - 1;
      // startTime = moment().add(1, 'second');
      
      seconds = seconds - 1;
      if (seconds < 0) {
        seconds = 59;
      }

      if (seconds === 59 ) {
        minutes = minutes - 1;
      }
      
      // console.log(startTime);
      console.log(seconds);
      if ((seconds % 60) === 0)  {
        // startTime = moment().add(1, 'minute').seconds(0);
        // minutes = minutes - 1;
        seconds = 0;
      }
      // document.getElementById('demo').innerHTML = startTime.get('minutes') + 'm ' + startTime.get('seconds') + 's ';
      document.getElementById('demo').innerHTML = minutes + 'm ' + seconds + 's ';

      if ( counter === 0 ) {
        clearInterval(k);
        document.getElementById('demo').innerHTML = 'EXPIRED';
      }
    }, 1000);
    // console.log('starttime', startTime.get('seconds'));
    
    
    // const countDownDate = new Date('Sep 5, 2018 15:30:00').getTime();
    
    // Update the count down every 1 second
    // const x = setInterval(function() {
    
        // Get todays date and time
        // let now = new Date('Sep 5, 2018 15:00:00').getTime();
        // const z = new Date('Sep 5, 2018 15:00:01').getTime();
        // Find the distance between now an the count down date
        // const distance = countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        // const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        // const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        // const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        // const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Output the result in an element with id="demo"
        // document.getElementById('demo').innerHTML = minutes + 'm ' + seconds + 's ';
        
        // If the count down is over, write some text 
        // if (distance < 0) {
        //     clearInterval(x);
        //     document.getElementById('demo').innerHTML = 'EXPIRED';
        // }

        
  //   }, 1000);
   }
  
}
