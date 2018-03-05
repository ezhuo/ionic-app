import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetLocationPage } from './get-location';
import { MapLocationModule } from "../map-location/map-location.module";

@NgModule({
  declarations: [
    GetLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(GetLocationPage), MapLocationModule
  ],
})
export class GetLocationPageModule { }
