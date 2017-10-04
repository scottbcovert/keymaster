import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {BeaconProvider} from '../../providers/beacon-provider/beacon-provider';
import {LockProvider} from '../../providers/lock-provider/lock-provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [BeaconProvider,LockProvider]
})
export class HomePage {

  doorState: string = 'unknown';

  constructor(private navCtrl: NavController, private beaconProvider: BeaconProvider, private lockProvider: LockProvider) {
    this.beaconProvider.initialize();
    this.lockProvider.initialize()
    .then(() => {this.doorState = this.lockProvider.doorState;})
    .catch((error: string) => {console.log(error);});
  }

  refreshDoorState(event: any) {
    this.lockProvider.refreshDoorState(event)
    .then(() => {this.doorState = this.lockProvider.doorState})
    .catch((error: string) => {console.log(error);});
  }

  setLockState(newState: number) {
    this.doorState = (newState) ? 'unlocking' : 'locking';
  	this.lockProvider.setLockState(newState)
    .then(() => {this.refreshDoorState(null);})
    .catch((error: string) => {console.log(error);});
  }
}
