import {
    AfterViewInit,
    Component,
    ViewEncapsulation,
    Injector,
} from '@angular/core';
import { ParentModalControl } from '@core';
import { ConferenceData } from '../../../../../providers/conference-data';

@Component({
    selector: 'page-schedule-filter',
    templateUrl: 'schedule-filter.html',
    styleUrls: ['./schedule-filter.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ScheduleFilterPage extends ParentModalControl
    implements AfterViewInit {
    tracks: { name: string; isChecked: boolean }[] = [];

    constructor(protected injector: Injector) {
        super(injector);
    }

    get confData() {
        return this.injector.get(ConferenceData);
    }

    // TODO use the ionViewDidEnter event
    ngAfterViewInit() {
        // passed in array of track names that should be excluded (unchecked)
        const excludedTrackNames = []; // this.navParams.data.excludedTracks;

        this.confData.getTracks().subscribe((trackNames: string[]) => {
            trackNames.forEach(trackName => {
                this.tracks.push({
                    name: trackName,
                    isChecked: excludedTrackNames.indexOf(trackName) === -1,
                });
            });
        });
    }

    resetFilters() {
        // reset all of the toggles to be checked
        this.tracks.forEach(track => {
            track.isChecked = true;
        });
    }

    applyFilters() {
        // Pass back a new array of track names to exclude
        const excludedTrackNames = this.tracks
            .filter(c => !c.isChecked)
            .map(c => c.name);
        this.dismiss(excludedTrackNames);
    }

    dismiss(data?: any) {
        // using the injected ModalController this page
        // can "dismiss" itself and pass back data
        this.modalSrv.modalCtl.dismiss(data);
    }
}
