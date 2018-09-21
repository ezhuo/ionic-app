import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import {
    DemoRoutingModule,
    routedComponents,
    entryComponents,
} from './demo-routing.module';

@NgModule({
    imports: [SharedModule, DemoRoutingModule],
    declarations: [...routedComponents, ...entryComponents],
    entryComponents: [...entryComponents],
})
export class DemoModule {}
