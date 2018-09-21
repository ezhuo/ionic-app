import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import {
    AccountPageRoutingModule,
    routedComponents,
    entryComponents,
} from './account-routing.module';

@NgModule({
    imports: [SharedModule, AccountPageRoutingModule],
    declarations: [...routedComponents, ...entryComponents],
})
export class AccountModule {}
