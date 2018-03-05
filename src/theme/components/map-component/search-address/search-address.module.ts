import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchAddress } from './search-address';

@NgModule({
  declarations: [
    SearchAddress,
  ],
  imports: [
    IonicPageModule.forChild(SearchAddress),
  ],
  exports: [
    SearchAddress
  ]
})
export class SearchAddressModule { }
