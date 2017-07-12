import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import * as force from '../../services/force';
import * as lockEventService from '../../services/LockEventService'

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  doorState: string;
  passphrase: string;

  constructor(private navCtrl: NavController) {
    // Initialize ForceJS
    force.init({
      appId: 'FakeConsumerKey',
      apiVersion: 'v40.0',
      oauthCallbackURL: 'http://localhost:8100/home'
    });
    // Log into Salesforce
    force.login().then(() => {
      lockEventService.findRunningUserAccessToken()
        .then((result: any) => {
          this.passphrase = result.records[0].Passphrase__c;
          this.doorState = 'unknown';
          this.refreshDoorState(null);
        })
        .catch((error: string) => {console.log(error);});
    });
  }

  refreshDoorState(event) {
    lockEventService.getDoorState(this.passphrase)
        .then((result: any) => {this.doorState = (result.data) ? result.data.doorState : 'unknown'; this.stopRefresh(event);})
        .catch((error: string) => {console.log(error); this.stopRefresh(event);});
  }

  stopRefresh(event) {
    if(event)
    {
      event.complete();
    }
  }

  setLockState(newState: number) {
  	if (newState === 0)
  	{
  		this.doorState = 'locking';
      lockEventService.toggleLock('Locked',this.passphrase)
        .then(() => {this.refreshDoorState(null);})
        .catch((error: string) => {console.log(error);});
  	}
  	else if (newState === 1)
  	{
  		this.doorState = 'unlocking';
      lockEventService.toggleLock('Unlocked',this.passphrase)
        .then(() => {this.refreshDoorState(null);})
        .catch((error: string) => {console.log(error);});
  	}
  }
}
