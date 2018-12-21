import { Component, Injector, OnInit, ViewChild } from '@angular/core';

import { IonSlides } from '@ionic/angular';
import { IndexControl } from '@core';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
  styleUrls: ['./tutorial.scss'],
})
export class TutorialPage extends IndexControl implements OnInit {
  showSkip = true;

  @ViewChild('slides')
  slides: IonSlides;

  constructor(protected injector: Injector) {
    super(injector);
    super.__init__(this);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  startApp() {
    this.route
      .navigateByUrl('/app/tabs/schedule')
      .then(() => this.ionSrv.storage.set('ion_did_tutorial', 'true'));
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }

  ionViewWillEnter() {
    super.ionViewWillEnter();
    this.ionSrv.storage.get('ion_did_tutorial').then(res => {
      if (res === true) {
        this.route.navigateByUrl('/app/tabs/schedule');
      }
    });

    this.ionSrv.menu.enable(false);
  }

  ionViewDidLeave() {
    super.ionViewDidLeave();
    // enable the root left menu when leaving the tutorial page
    this.ionSrv.menu.enable(true);
  }
}
