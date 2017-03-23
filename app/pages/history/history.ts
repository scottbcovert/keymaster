import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import * as lockEventService from '../../services/LockEventService'

@Component({
  templateUrl: 'build/pages/history/history.html'
})
export class HistoryPage {

  pastLockEvents: any;
  
  constructor(private navCtrl: NavController) {
  	this.refreshHistory(null);
  }

  refreshHistory(event) {
  	lockEventService.findRecords(20)
  		.then((result: any) => {this.pastLockEvents = result.records; this.stopRefresh(event);})
  		.catch((error: string) => {console.log(error); this.stopRefresh(event);});  		
  }

  stopRefresh(event) {
  	if(event)
  	{
  		event.complete();
  	}
  }

  formatDateString(s) {
  	var a = s.split(/[^0-9]/);
  	var d = new Date(a[0],a[1]-1,a[2],a[3],a[4],a[5]);
  	var offset = new Date().getTimezoneOffset();
  	d.setMinutes(d.getMinutes() - offset);
  	var hours = d.getHours();
    var minutes = d.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    var hoursStr = hours ? hours.toString() : '12';
    var minutesStr = minutes < 10 ? '0'+minutes.toString() : minutes.toString();
    var strTime = hoursStr + ':' + minutesStr + ampm;
  	return (d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear() + ' ' + strTime
  }

}
