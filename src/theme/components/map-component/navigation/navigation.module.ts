import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Navigation } from './navigation';

@NgModule({
  declarations: [
    Navigation,
  ],
  imports: [
    IonicPageModule.forChild(Navigation),
  ],
  exports: [
    Navigation
  ]
})
export class NavigationModule { }
