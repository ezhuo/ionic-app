import {Component, ViewChild} from '@angular/core';
import {HomePage} from '../home/home';
import {MinePage} from '../mine/mine';
import {Tabs, Events} from "ionic-angular";
import {TestPage} from "../test/test";
import {DemoPage} from "../demo/demo";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') tabs: Tabs;
  testRoot: any = TestPage;
  demoRoot: any = DemoPage;
  homeRoot: any = HomePage;
  mineRoot: any = MinePage;

  constructor(public events: Events) {
  }

}
