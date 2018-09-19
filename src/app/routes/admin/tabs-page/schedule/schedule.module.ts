import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import {
    SchedulePageRoutingModule,
    routedComponents,
    entryComponents,
} from './schedule-routing.module';

@NgModule({
    imports: [SharedModule, SchedulePageRoutingModule],
    declarations: [...routedComponents, ...entryComponents],
    entryComponents: [...entryComponents],
})
export class ScheduleModule {}
