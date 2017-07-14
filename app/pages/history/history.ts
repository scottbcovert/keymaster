import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LockProvider} from '../../providers/lock-provider/lock-provider';

@Component({
  templateUrl: 'build/pages/history/history.html'
})
export class HistoryPage {

  pastLockEvents: any;

  constructor(private navCtrl: NavController, private lockProvider: LockProvider) {
  	this.lockProvider.initialize()
    .then(() => {this.refreshHistory(null);})
    .catch((error: string) => {console.log(error);});
  }

  refreshHistory(event: any) {
  	this.lockProvider.findRecords(20, event)
  		.then((result: any) => {this.pastLockEvents = this.lockProvider.pastLockEvents;})
  		.catch((error: string) => {console.log(error);});
  }

  formatDateString(s: any) {
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
