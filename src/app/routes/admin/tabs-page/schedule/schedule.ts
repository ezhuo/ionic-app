import {
    Component,
    ViewChild,
    ViewEncapsulation,
    Injector,
} from '@angular/core';
import { List } from '@ionic/angular';
import { ParentIndexControl } from '@core';
import { ScheduleFilterPage } from './schedule-filter/schedule-filter';
import { ConferenceData } from '../../../../providers/conference-data';
import { UserData } from '../../../../providers/user-data';

@Component({
    selector: 'page-schedule',
    templateUrl: 'schedule.html',
    styleUrls: ['./schedule.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SchedulePage extends ParentIndexControl {
    // Gets a reference to the list element
    @ViewChild('scheduleList')
    scheduleList: List;

    dayIndex = 0;
    queryText = '';
    segment = 'all';
    excludeTracks: any = [];
    shownSessions: any = [];
    groups: any = [];
    confDate: string;

    constructor(protected injector: Injector) {
        super(injector);
    }

    get confData() {
        return this.injector.get(ConferenceData);
    }

    get user() {
        return this.injector.get(UserData);
    }

    ionViewWillEnter() {
        // this.app.setTitle('Schedule');
        this.updateSchedule();
    }

    updateSchedule() {
        // Close any open sliding items when the schedule updates
        if (this.scheduleList) {
            this.scheduleList.closeSlidingItems();
        }

        this.confData
            .getTimeline(
                this.dayIndex,
                this.queryText,
                this.excludeTracks,
                this.segment,
            )
            .subscribe((data: any) => {
                this.shownSessions = data.shownSessions;
                this.groups = data.groups;
            });
    }

    async presentFilter() {
        const modal = await this.modalSrv.modalCtl.create({
            component: ScheduleFilterPage,
            componentProps: { excludedTracks: this.excludeTracks },
        });
        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data) {
            this.excludeTracks = data;
            this.updateSchedule();
        }
    }

    goToSessionDetail(sessionData: any) {
        // go to the session detail page
        // and pass in the session data
        this.route.navigateByUrl(
            `app/admin/tabs/(schedule:session/${sessionData.id})`,
        );
    }

    async addFavorite(
        slidingItem: HTMLIonItemSlidingElement,
        sessionData: any,
    ) {
        if (this.user.hasFavorite(sessionData.name)) {
            // woops, they already favorited it! What shall we do!?
            // prompt them to remove it
            this.removeFavorite(
                slidingItem,
                sessionData,
                'Favorite already added',
            );
        } else {
            // remember this session as a user favorite
            this.user.addFavorite(sessionData.name);

            // create an alert instance
            const alert = await this.noticeSrv.alertCtl.create({
                header: 'Favorite Added',
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                            // close the sliding item
                            slidingItem.close();
                        },
                    },
                ],
            });
            // now present the alert on top of all other content
            await alert.present();
        }
    }

    async removeFavorite(
        slidingItem: HTMLIonItemSlidingElement,
        sessionData: any,
        title: string,
    ) {
        const alert = await this.noticeSrv.alertCtl.create({
            header: title,
            message:
                'Would you like to remove this session from your favorites?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        // they clicked the cancel button, do not remove the session
                        // close the sliding item and hide the option buttons
                        slidingItem.close();
                    },
                },
                {
                    text: 'Remove',
                    handler: () => {
                        // they want to remove this session from their favorites
                        this.user.removeFavorite(sessionData.name);
                        this.updateSchedule();

                        // close the sliding item and hide the option buttons
                        slidingItem.close();
                    },
                },
            ],
        });
        // now present the alert on top of all other content
        await alert.present();
    }

    toggleList(
        fabButton: HTMLIonFabButtonElement,
        fabList: HTMLIonFabListElement,
    ) {
        fabButton.activated = !fabButton.activated;
        fabList.activated = !fabList.activated;
    }

    async openSocial(network: string, fab: HTMLIonFabElement) {
        const loading = await this.noticeSrv.loadingCtl.create({
            message: `Posting to ${network}`,
            duration: Math.random() * 1000 + 500,
        });
        await loading.present();
        await loading.onWillDismiss();
        fab.close();
    }

    /*doRefresh(refresher: Refresher) {
    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;

      // simulate a network request that would take longer
      // than just pulling from out local json file
      setTimeout(() => {
        refresher.complete();

        const toast = this.toastCtrl.create({
          message: 'Sessions have been updated.',
          duration: 3000
        });
        toast.present();
      }, 1000);
    });
  }
  */
}
