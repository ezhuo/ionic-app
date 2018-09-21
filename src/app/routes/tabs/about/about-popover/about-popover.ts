import { Component, Injector } from '@angular/core';
import { ModalControl } from '@core';

@Component({
    template: `
    <ion-list>
      <ion-item button (click)="close('https://ionicframework.com/docs/v2/getting-started')">
        <ion-label>Learn Ionic</ion-label>
      </ion-item>
      <ion-item button (click)="close('https://ionicframework.com/docs/v2')">
        <ion-label>Documentation</ion-label>
      </ion-item>
      <ion-item button (click)="close('https://showcase.ionicframework.com')">
        <ion-label>Showcase</ion-label>
      </ion-item>
      <ion-item button (click)="close('https://github.com/ionic-team/ionic')">
        <ion-label>GitHub Repo</ion-label>
      </ion-item>
      <ion-item button (click)="support()">
        <ion-label>Support</ion-label>
      </ion-item>
    </ion-list>
  `,
})
export class PopoverPage extends ModalControl {
    constructor(protected injector: Injector) {
        super(injector);
    }

    support() {
        // this.app.getRootNavs()[0].push('/support');
        this.modalSrv.popoverCtl.dismiss();
    }

    close(url: string) {
        window.open(url, '_blank');
        this.modalSrv.popoverCtl.dismiss();
    }
}
