import { NgModule } from '@angular/core';
import { AboutPage } from "./about";
import { SharedModule } from '../../shared/shared.module';

const Modules = [
  SharedModule
];

const Components = [
    AboutPage
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
export class AboutModule {
}
