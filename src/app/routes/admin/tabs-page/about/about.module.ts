import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
// import { AboutPage } from './about';

import {
    AboutPageRoutingModule,
    routedComponents,
    entryComponents,
} from './about-routing.module';

@NgModule({
    imports: [SharedModule, AboutPageRoutingModule],
    declarations: [...routedComponents, ...entryComponents],
    entryComponents: [...entryComponents],
})
export class AboutModule {}
