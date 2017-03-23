import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {WelcomePage} from './pages/welcome/welcome';
import {TabsPage} from './pages/tabs/tabs';
import * as force from './services/force';



@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = TabsPage;
    platform.ready().then(() => {
      let self = this;
      // Log into Salesforce
      force.init({
        appId: 'FakeConsumerKey',
        apiVersion: 'v37.0',
        oauthCallbackURL: 'http://localhost:8100/home'
      });
      force.login().then(() => {
        this.rootPage = TabsPage;
        StatusBar.styleDefault();
      });
    });
  }
}

ionicBootstrap(MyApp);
