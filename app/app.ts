import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {BeaconProvider} from './providers/beacon-provider/beacon-provider';
import {LockProvider} from './providers/lock-provider/lock-provider';
import {WelcomePage} from './pages/welcome/welcome';
import {TabsPage} from './pages/tabs/tabs';



@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    platform.ready().then(() => {
      this.rootPage = TabsPage;
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, [BeaconProvider, LockProvider]);
