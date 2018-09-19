import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { LayoutDefaultComponent } from './default.component';

const COMPONENTS = [LayoutDefaultComponent];

const HEADERCOMPONENTS = [];

const entryComponents = [];

@NgModule({
    declarations: [...COMPONENTS, ...HEADERCOMPONENTS, ...entryComponents],
    imports: [SharedModule],
    exports: [...COMPONENTS, ...HEADERCOMPONENTS],
    providers: [],
    entryComponents: [...entryComponents],
})
export class LayoutDefaultModule {}
