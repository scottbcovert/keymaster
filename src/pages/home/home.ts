import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {LockProvider} from '../../providers/lock-provider/lock-provider';

declare var geofence;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [LockProvider]
})
export class HomePage {

  doorState: string = 'unknown';

  constructor(private navCtrl: NavController, private platform: Platform, private lockProvider: LockProvider) {
    this.platform.ready().then(() => {
      this.lockProvider.initialize()
      .then(() => {this.doorState = this.lockProvider.doorState;})
      .catch((error: string) => {console.log(error);});
      // Ensure onTransitionReceived callback is re-injected on app launch, even prior to initialization https://github.com/cowbell/cordova-plugin-geofence/issues/128
      geofence.onTransitionReceived = (resp) => {
        this.setLockState(0);
      };
      geofence.initialize()
      .then(() => {this.prepareGeofence();})
      .catch((error: string) => {console.log(error);});      
    });    
  }

  private prepareGeofence() {
    geofence.getWatched()
    .then((watchedGeofencesJSON: string) => {
      let watchedGeofences = JSON.parse(watchedGeofencesJSON);
      if (watchedGeofences && watchedGeofences.length > 0) {
        watchedGeofences = watchedGeofences.concat(watchedGeofences);        
        return;
      }      
      let newFence = {
        id: '1', // Pull a unique id from https://www.guidgenerator.com/
        latitude:       38.897957, // Replace with your own geocoordinates
        longitude:      -77.036560,
        radius:         10,
        transitionType: 1,
        notification: {
            id:             (new Date().getTime()),
            title:          'Welcome Home!',
            text:           'Allow me to get the door for you...',
            openAppOnClick: false
        }
      }
      geofence.addOrUpdate([newFence])
      .then(() => {console.log('New geofence added.');})
      .catch((error :string) => {console.log(error);});      
    })
    .catch((error :string) => {console.log(error);});    
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
