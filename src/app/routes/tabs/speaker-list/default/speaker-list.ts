import { Component, ViewEncapsulation, Injector } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { IndexControl } from '@core';
import { ConferenceData } from '@shared';

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html',
  styleUrls: ['./speaker-list.scss'],
})
export class SpeakerListPage extends IndexControl {
  speakers: any[] = [];

  constructor(protected injector: Injector) {
    super(injector);
    super.__init__(this);
  }

  get actionSheetCtrl() {
    return this.injector.get(ActionSheetController);
  }

  get confData() {
    return this.injector.get(ConferenceData);
  }

  get inAppBrowser() {
    return this.injector.get(InAppBrowser);
  }

  ionViewDidEnter() {
    this.confData.getSpeakers().subscribe((speakers: any[]) => {
      this.speakers = speakers;
    });
  }

  goToSessionDetail(session: any) {
    this.route.navigateByUrl(`app/tabs/speakers/session/${session.id})`);
  }

  goToSpeakerDetail(speaker: any) {
    this.route.navigateByUrl(
      `app/tabs/speakers/speaker-details/${speaker.id})`,
    );
  }

  goToSpeakerTwitter(speaker: any) {
    this.inAppBrowser.create(
      `https://twitter.com/${speaker.twitter}`,
      '_blank',
    );
  }

  async openSpeakerShare(speaker: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log(
              'Copy link clicked on https://twitter.com/' + speaker.twitter,
            );
            if (
              (window as any)['cordova'] &&
              (window as any)['cordova'].plugins.clipboard
            ) {
              (window as any)['cordova'].plugins.clipboard.copy(
                'https://twitter.com/' + speaker.twitter,
              );
            }
          },
        },
        {
          text: 'Share via ...',
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  async openContact(speaker: any) {
    const mode = 'ios'; // this.config.get('mode');

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Contact ' + speaker.name,
      buttons: [
        {
          text: `Email ( ${speaker.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + speaker.email);
          },
        },
        {
          text: `Call ( ${speaker.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + speaker.phone);
          },
        },
      ],
    });

    await actionSheet.present();
  }
}
