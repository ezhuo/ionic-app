import { NgModule } from '@angular/core';
import { TestPage } from "./test";
import { TestService } from "./TestService";
import { SelectPicturePageModule } from "../../theme/components/select-picture/select-picture.module";
import { SharedModule } from '../../shared/shared.module';

const Modules = [
  SharedModule,
  SelectPicturePageModule
];

const Components = [
  TestPage
];

const Services = [
  TestService
];

@NgModule({
  imports: [
    ...Modules
  ],
  declarations: [...Components],
  entryComponents: [...Components],
  providers: [...Services]
})
export class TestModule {
}
