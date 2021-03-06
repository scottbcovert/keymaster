import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {HistoryPage} from '../history/history';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;  

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HomePage;
    this.tab2Root = HistoryPage;
  }
}
