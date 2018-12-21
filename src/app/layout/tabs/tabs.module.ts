import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { LayoutTabsComponent } from './tabs.component';

const COMPONENTS = [LayoutTabsComponent];
const HEADERCOMPONENTS = [];
const entryComponents = [];

@NgModule({
    declarations: [...COMPONENTS, ...HEADERCOMPONENTS, ...entryComponents],
    imports: [SharedModule],
    exports: [...COMPONENTS, ...HEADERCOMPONENTS],
    providers: [],
    entryComponents: [...entryComponents],
})
export class LayoutTabsModule {}
