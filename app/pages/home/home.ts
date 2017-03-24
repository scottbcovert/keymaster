import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import * as lockEventService from '../../services/LockEventService'

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  doorState: string;
  passphrase: string;

  constructor(private navCtrl: NavController) {
    lockEventService.findRecords(1)
      .then((result: any) => {this.doorState = result.records[0].NewState__c;})
      .catch((error: string) => {console.log(error);});
    lockEventService.findRunningUserAccessToken()
      .then((result: any) => {this.passphrase = result.records[0].Passphrase__c;})
      .catch((error: string) => {console.log(error);});
  }

  setLockState(newState: number) {
  	if (newState === 0)
  	{
  		lockEventService.toggleLock('Locked',this.passphrase);
  		this.doorState = 'locked';
  	}
  	else if (newState === 1)
  	{
  		lockEventService.toggleLock('Unlocked',this.passphrase);
  		this.doorState = 'unlocked';
  	}
  }
}
