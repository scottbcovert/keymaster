import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {TabsPage} from '../pages/tabs/tabs';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    platform.ready().then(() => {
      this.rootPage = TabsPage;
    });
  }
}
