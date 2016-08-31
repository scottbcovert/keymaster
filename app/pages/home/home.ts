import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import * as force from './force';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  doorState: string;

  constructor(private navCtrl: NavController) {
  	this.doorState = 'locked';
  }
}
