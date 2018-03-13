import { NgModule } from '@angular/core';
import { ContactPage } from "./contact";
import { SharedModule } from '../../shared/shared.module';

const Modules = [
  SharedModule
];

const Components = [
    ContactPage
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
export class ContactModule {
}
