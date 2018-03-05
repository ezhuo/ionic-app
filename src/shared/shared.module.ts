import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Conversion } from './../theme/pipes/conversion';
import { DirectivesModule } from './../theme/directives/directives.module';

export const pipes = [Conversion];

const sharedModule = [IonicModule];
@NgModule({
    imports: [...sharedModule, DirectivesModule],
    exports: [...sharedModule],
    declarations: [],
    providers: [],
})
export class SharedModule { }
