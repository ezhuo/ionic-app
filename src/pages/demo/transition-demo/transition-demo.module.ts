import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransitionDemoPage } from './transition-demo';

@NgModule({
  declarations: [
    TransitionDemoPage,
  ],
  imports: [
    IonicPageModule.forChild(TransitionDemoPage),
  ],
  exports: [
    TransitionDemoPage
  ]
})
export class TransitionDemoPageModule {}
