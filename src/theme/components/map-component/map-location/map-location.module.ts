import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapLocation } from "./map-location";
import { NavigationModule } from "../navigation/navigation.module";
import { SearchAddressModule } from "../search-address/search-address.module";

@NgModule({
  declarations: [
    MapLocation,
  ],
  imports: [
    IonicPageModule.forChild(MapLocation), NavigationModule, SearchAddressModule
  ],
  exports: [
    MapLocation
  ]
})
export class MapLocationModule { }
