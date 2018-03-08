import { NativeDemoPage } from './native-demo';
import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

@NgModule({
    imports: [IonicPageModule.forChild(NativeDemoPage)],
    exports: [],
    declarations: [NativeDemoPage],
    providers: [],
})
export class NativeDemoModule { }
