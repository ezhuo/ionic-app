import { Component, ViewEncapsulation, Injector } from '@angular/core';
import { ConferenceData } from '@shared';
import { IndexControl } from '@core';

@Component({
    selector: 'page-speaker-detail',
    templateUrl: 'speaker-detail.html',
    styleUrls: ['./speaker-detail.scss'],
})
export class SpeakerDetailPage extends IndexControl {
    speaker: any;

    constructor(protected injector: Injector) {
        super(injector);
        super.__init__(this);
    }

    get dataProvider() {
        return this.injector.get(ConferenceData);
    }

    ionViewWillEnter() {
        this.dataProvider.load().subscribe((data: any) => {
            const speakerId = this.activeRoute.snapshot.paramMap.get(
                'speakerId',
            );
            if (data && data.speakers) {
                for (const speaker of data.speakers) {
                    if (speaker && speaker.id === speakerId) {
                        this.speaker = speaker;
                        break;
                    }
                }
            }
        });
    }

    goToSessionDetail(session: any) {
        this.navigateByUrl(`app/tabs/schedule/session/${session.id})`);
    }
}
