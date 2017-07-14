import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IBeacon } from 'ionic-native';
import {LockProvider} from '../../providers/lock-provider/lock-provider';


/*
  Generated class for the BeaconProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BeaconProvider {

  delegate: any;
  region: any;

  constructor(public platform: Platform, private lockProvider: LockProvider) {}

  initialize(): any {
    let promise = new Promise((resolve, reject) => {
      // we need to be running on a device
      if (this.platform.is('cordova')) {

        // Request permission to use location on iOS
        IBeacon.requestAlwaysAuthorization();

        this.lockProvider.initialize();

        // create a new delegate and register it with the native layer
        this.delegate = IBeacon.Delegate();

        // Subscribe to some of the delegate's event handlers
        this.delegate.didEnterRegion()
        .subscribe(
          data => {
            console.log('didEnterRegion: ', data);
            this.lockProvider.setLockState(1);
          },
          error => console.error()
        );

        this.delegate.didExitRegion()
        .subscribe(
          data => {
            console.log('didExitRegion: ', data);
            this.lockProvider.setLockState(0);
          },
          error => console.error()
        );

        // setup a beacon region – CHANGE THIS TO YOUR OWN UUID
        this.region = IBeacon.BeaconRegion('GateKeeper', '00000000-0000-0000-0000-000000000000', 00000, 00000, true);

        IBeacon.startMonitoringForRegion(this.region)
        .then(
          () => console.log('Native layer received the request to monitoring'),
          error => console.error('Native layer failed to begin monitoring: ', error)
        );

      } else {
        console.error('This application needs to be running on a device');
        resolve(false);
      }
    });

    return promise;
  }
}
