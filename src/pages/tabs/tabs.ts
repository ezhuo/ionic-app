import { DemoPage } from './../demo/demo';
import { MinePage } from './../mine/mine';
import { Component, ViewChild } from '@angular/core';
import { Tabs, Events } from "ionic-angular";
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') tabs: Tabs;

  tab1Root = HomePage;
  tab2Root = DemoPage;
  tab3Root = MinePage;

  constructor(public events: Events) {

  }
}
