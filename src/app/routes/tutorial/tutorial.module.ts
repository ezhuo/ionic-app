import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import {
    TutorialPageRoutingModule,
    routedComponents,
    entryComponents,
} from './tutorial-routing.module';

@NgModule({
    imports: [SharedModule, TutorialPageRoutingModule],
    declarations: [...routedComponents, ...entryComponents],
    entryComponents: [...entryComponents],
})
export class TutorialModule {}
