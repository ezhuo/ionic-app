import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import {
    SpeakerListPageRoutingModule,
    routedComponents,
    entryComponents,
} from './speaker-list-routing.module';

@NgModule({
    imports: [SharedModule, SpeakerListPageRoutingModule],
    declarations: [...routedComponents, ...entryComponents],
    entryComponents: [...entryComponents],
})
export class SpeakerListModule {}
