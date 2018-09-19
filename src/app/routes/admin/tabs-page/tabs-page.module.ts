import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import {
    TabsPageRoutingModule,
    routedComponents,
    entryComponents,
} from './tabs-page-routing.module';

import { AboutModule } from './about/about.module';
import { ScheduleModule } from './schedule/schedule.module';
import { SpeakerListModule } from './speaker-list/speaker-list.module';

const MODULES = [
    AboutModule,
    ScheduleModule,
    SpeakerListModule,
    TabsPageRoutingModule,
];

@NgModule({
    imports: [SharedModule, ...MODULES],
    declarations: [...routedComponents, ...entryComponents],
})
export class TabsModule {}
