import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import * as force from '../../services/force';

/*
  Generated class for the LockProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LockProvider {

  public doorState: string;
  public pastLockEvents: any;
  private passphrase: string;
  private keyMasterVersion: String = '1.0';

  constructor(public platform: Platform) {}

  initialize(): any {
    let promise = new Promise((resolve, reject) => {
      // we need to be running on a device
      if (this.platform.is('cordova')) {

        // Initialize ForceJS
        force.init({
          appId: 'FakeConsumerKey',
          apiVersion: 'v41.0',
          oauthCallbackURL: 'http://localhost:8100/home'
        });

        // Log into Salesforce
        force.login().then(() => {
          this.findRunningUserAccessToken()
            .then((result: any) => {
              this.doorState = 'unknown';
              this.passphrase = result.records[0].Passphrase__c;
              this.refreshDoorState(null)
              .then(() => {resolve(true);})
              .catch((error: string) => {console.log(error);});
            })
            .catch((error: string) => {console.log(error);});
        });

      } else {
        console.error('This application needs to be running on a device');
        resolve(false);
      }
    });

    return promise;
  }

  getDoorState(): any {
    return force.request({
      method: 'GET',
      contentType: 'application/json',
      path: '/services/apexrest/v' + this.keyMasterVersion + '/keymaster',
      params: {
        passphrase: this.passphrase
      }
    });
  }

  getRemoteServerURL(): any {
    return force.getOAuthResult().instance_url + '/services/apexrest/v' + this.keyMasterVersion + '/keymaster';
  }

  getUnlockPostString(): any {
    return 'newState=unlocked&passphrase=' + this.passphrase;
  }

  getAccessToken(): any {
     return force.getOAuthResult().access_token;
  }

  findRunningUserAccessToken(): any {
    return force.query('SELECT Passphrase__c FROM AccessToken__c WHERE User__c = \'' + force.getUserId() + '\' AND Expired__c = false LIMIT 1');
  }

  refreshDoorState(event: any): any {
      return this.getDoorState()
      .then((result: any) => {this.doorState = (result.data) ? result.data.doorState : 'unknown'; this.stopRefresh(event);})
      .catch((error: string) => {console.log(error); this.stopRefresh(event);});
    }

  stopRefresh(event: any) {
    if(event)
    {
      event.complete();
    }
  }

  setLockState(newState: number): any {
    let newLockState = (newState) ? 'unlocked' : 'locked';
    return this.toggleLock(newLockState)
    .then(() => {this.refreshDoorState(null);})
    .catch((error: string) => {console.log(error);});
  }

  findRecords(limit: number, event: any): any {
    return force.query('SELECT Id, CreatedDate, NewState__c, StateChangedBy__c FROM LockEvent__c ORDER BY CreatedDate DESC LIMIT ' + limit.toString())
    .then((result: any) => {this.pastLockEvents = result.records; this.stopRefresh(event);})
    .catch((error: string) => {console.log(error); this.stopRefresh(event);});
  }

  toggleLock(newState: string): any {
    return force.request({
       method: 'POST',
       contentType: 'application/json',
       path: '/services/apexrest/v' + this.keyMasterVersion + '/keymaster',
       params: {
         newState: newState,
         passphrase: this.passphrase
       }
    });

  }
}

