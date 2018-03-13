import { NgModule } from '@angular/core';
import { HomePage } from "./home";
import { SharedModule } from '../../shared/shared.module';

const Modules = [
  SharedModule
];

const Components = [
    HomePage
];

const Services = [
];

@NgModule({
  imports: [...Modules],
  declarations: [...Components],
  entryComponents: [...Components],
  providers: [...Services],
  exports: []
})
export class HomeModule {
}
