import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import * as force from './force';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      
      force.init({
        appId: '3MVG9szVa2RxsqBZLxJD1.on8bfUCqSzUK.wWBh8XEYyRBTLPOffcg1uxogIW9lDkgn5xn3sxlrzRstIipOKB',
        apiVersion: 'v37.0',
        oauthCallbackURL: 'http://localhost:8100/'
      });
      force.login()

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
