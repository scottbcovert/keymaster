import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import * as lockEventService from '../../services/LockEventService'

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  doorState: string;

  constructor(private navCtrl: NavController) {
  	this.doorState = 'locked';
  }

  setLockState(newState: number) {
  	if (newState === 0)
  	{
  		lockEventService.create('Locked','Scott Covert');
  		this.doorState = 'locked';
  	}
  	else if (newState === 1)
  	{
  		lockEventService.create('Unlocked','Scott Covert');
  		this.doorState = 'unlocked';
  	}
  }
}
