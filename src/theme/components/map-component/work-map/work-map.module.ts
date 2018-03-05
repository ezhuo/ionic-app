import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkMapPage } from "./work-map";
import { MapLocationModule } from "../map-location/map-location.module";

@NgModule({
  declarations: [
    WorkMapPage
  ],
  imports: [
    IonicPageModule.forChild(WorkMapPage), MapLocationModule
  ],
  exports: [
    WorkMapPage
  ]
})
export class WorkMapModule { }
