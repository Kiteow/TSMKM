import { Component } from '@angular/core';
import { Insomnia } from '@ionic-native/insomnia/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  percent:number=0;
  radius:number=100;
  fullTime:any = '00:01:30';

  timer:any=false;
  progress:any = 0;
  minutes:number=1;
  seconds:any=30;

  workinTime:any = {
    h:'00',
    m:'00',
    s:'00'
  }

  workingTimeTimer: any = false;


  constructor(private insomnia: Insomnia){}
  
  startTiming(){

    if(this.timer){
      clearInterval(this.timer);
    }

    if(!this.workingTimeTimer){
      this.workingTimerProgress();
      this.insomnia.keepAwake();
    }

    this.timer=false; 
    this.percent=0;
    this.progress= 0;

    let timediff = this.fullTime.split(':');
    this.minutes = timediff[1];
    this.seconds = timediff[2];
    let allSeconds = Math.floor(this.minutes*60) + parseInt(this.seconds);

    this.timer = setInterval(()=>{

        if(this.percent == this.radius)
        clearInterval(this.timer);

        this.percent = Math.floor((this.progress / allSeconds) *100);
        this.progress++;
    }, 1000)
  }

  workingTimerProgress(){//Progress of whole time timer

    let countDownDatw = new Date();
    this.workingTimeTimer = setInterval(()=>{

      let now = new Date().getTime();
      let sofar = now - countDownDatw.getTime();

      this.workinTime.h = Math.floor((sofar % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.workinTime.m = Math.floor((sofar % (1000 * 60 * 60)) / (1000 * 60));
      this.workinTime.s = Math.floor((sofar % (1000 * 60)) / 1000);

      this.workinTime.h = this.pad(this.workinTime.h, 2);
      this.workinTime.m = this.pad(this.workinTime.m, 2);
      this.workinTime.s = this.pad(this.workinTime.s, 2);

    },1000)
  }

  pad(num, size) {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  stopTiming(){
    
    clearInterval(this.timer);
    clearInterval(this.workingTimeTimer);
   
    this.workingTimeTimer = false;
    this.timer = false;    
    this.percent = 0;
    this.progress = 0;
    this.workinTime = {
      h: '00',
      m: '00',
      s: '00'
    }
    this,this.insomnia.allowSleepAgain();
  }


}
