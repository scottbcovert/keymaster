import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
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

ionicBootstrap(MyApp);
