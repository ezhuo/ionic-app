import { NgModule } from '@angular/core';
import { HomePage } from './home';
import { SharedModule } from '../../shared/shared.module';
import { SelectPicturePageModule } from "../../theme/components/select-picture/select-picture.module";

const Modules = [
  SharedModule,
  SelectPicturePageModule
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
