import { Component, Injector } from '@angular/core';

import { ConferenceData } from '../../../../../providers/conference-data';
import { ParentIndexControl } from '@core';

@Component({
    selector: 'page-session-detail',
    templateUrl: 'session-detail.html',
})
export class SessionDetailPage extends ParentIndexControl {
    session: any;

    constructor(protected injector: Injector) {
        super(injector);
    }

    get dataProvider() {
        return this.injector.get(ConferenceData);
    }

    ionViewWillEnter() {
        this.dataProvider.load().subscribe((data: any) => {
            if (
                data &&
                data.schedule &&
                data.schedule[0] &&
                data.schedule[0].groups
            ) {
                const sessionId = this.activeRoute.snapshot.paramMap.get(
                    'sessionId',
                );
                for (const group of data.schedule[0].groups) {
                    if (group && group.sessions) {
                        for (const session of group.sessions) {
                            if (session && session.id === sessionId) {
                                this.session = session;
                                break;
                            }
                        }
                    }
                }
            }
        });
    }
}
