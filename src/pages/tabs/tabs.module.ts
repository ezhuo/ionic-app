import { NgModule } from '@angular/core';
import { TabsPage } from "./tabs";
import { SharedModule } from '../../shared/shared.module';

const Modules = [
  SharedModule
];

const Components = [
  TabsPage
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
export class TabsModule {
}
