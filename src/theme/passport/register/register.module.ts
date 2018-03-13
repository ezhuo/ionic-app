import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { RegisterPage } from './register';

@NgModule({
    imports: [IonicPageModule.forChild(RegisterPage)],
    exports: [],
    declarations: [RegisterPage],
    providers: [],
})
export class RegisterPageModule { }
