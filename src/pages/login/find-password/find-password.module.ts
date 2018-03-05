import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

import { FindPasswordPage } from './find-password';

@NgModule({
    imports: [IonicPageModule.forChild(FindPasswordPage)],
    exports: [],
    declarations: [FindPasswordPage],
    providers: [],
})
export class FindPasswordModule { }
