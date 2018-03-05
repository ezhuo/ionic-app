import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagingPage } from './paging';

@NgModule({
  declarations: [
    PagingPage,
  ],
  imports: [
    IonicPageModule.forChild(PagingPage),
  ],
  exports: [
    PagingPage
  ]
})
export class PagingPageModule {}
