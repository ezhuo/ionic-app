import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import {
    MineRoutingModule,
    routedComponents,
    entryComponents,
} from './mine-routing.module';

@NgModule({
    imports: [SharedModule, MineRoutingModule],
    declarations: [...routedComponents, ...entryComponents],
    entryComponents: [...entryComponents],
})
export class MineModule {}
