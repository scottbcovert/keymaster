import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import * as lockEventService from '../../services/LockEventService'

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  doorState: string;
  userName: string;

  constructor(private navCtrl: NavController) {
    lockEventService.findRecords(1)
      .then((result: any) => {this.doorState = result.records[0].NewState__c;})
      .catch((error: string) => {console.log(error);});
    lockEventService.findRunningUser()
      .then((result: any) => {this.userName = result.records[0].Name;})
      .catch((error: string) => {console.log(error);});
  }

  setLockState(newState: number) {
  	if (newState === 0)
  	{
  		lockEventService.create('Locked',this.userName);
  		this.doorState = 'locked';
  	}
  	else if (newState === 1)
  	{
  		lockEventService.create('Unlocked',this.userName);
  		this.doorState = 'unlocked';
  	}
  }
}
