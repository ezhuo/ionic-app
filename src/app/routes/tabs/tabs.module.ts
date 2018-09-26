import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '@shared';
import { LayoutTabsModule } from '@layout';

import {
    TabsRoutingModule,
    routedComponents,
    entryComponents,
} from './tabs-routing.module';

import { DemoModule } from './demo/demo.module';
import { MineModule } from './mine';

import { ScheduleModule } from './schedule/schedule.module';
import { SpeakerListModule } from './speaker-list/speaker-list.module';

const MODULES = [
    TabsRoutingModule,
    LayoutTabsModule,
    ScheduleModule,
    SpeakerListModule,
    DemoModule,
    MineModule,
];

@NgModule({
    imports: [SharedModule, ...MODULES],
    declarations: [...routedComponents, ...entryComponents],
})
export class TabsModule {
    constructor(router: Router) {
        // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    }
}
