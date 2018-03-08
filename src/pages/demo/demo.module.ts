import { NgModule } from '@angular/core';
import { DemoPage } from "./demo";
import { CustomIconDemoPage } from "./custom-icon-demo/custom-icon-demo";
import { ChartjsDemoPage } from "./chartjs-demo/chartjs-demo";
import { EchartsDemoPage } from "./echarts-demo/echarts-demo";
import { SelectPicDemoPage } from "./select-pic-demo/select-pic-demo";
import { CustomPipeDemo } from "./custom-pipe-demo/custom-pipe-demo";
import { PagingPageModule } from "../../theme/components/paging/paging.module";
import { SelectPicturePageModule } from "../../theme/components/select-picture/select-picture.module";
import { ModalScalePageModule } from "./transition-demo/modal-scale/modal-scale.module";
import { ModalFromRightPageModule } from "./transition-demo/modal-from-right/modal-from-right.module";
import { TransitionDemoPageModule } from "./transition-demo/transition-demo.module";
import { CropPicDemoPage } from "./crop-pic-demo/crop-pic-demo";
import { CityPickerDemoPage } from "./city-picker-demo/city-picker-demo";
import { CityPickerModule } from "ionic2-city-picker";
import { DemoService } from "./DemoService";
import { CalendarModule } from "ion2-calendar";
import { CalendarDemoPage } from "./calendar-demo/calendar-demo";
import { FileCacheDemoPage } from "./file-cache-demo/file-cache-demo";
import { PermissionDemoPage } from "./permission-demo/permission-demo";
import { PatrolTaskPage } from "./permission-demo/patrol-task/patrol-task";
import { CustomerListPage } from "./permission-demo/customer-list/customer-list";
import { QrcodeDemoPage } from "./qrcode-demo/qrcode-demo";
import { AllowleverDemoPage } from './allowlever-demo/allowlever-demo';
import { SharedModule, pipes } from '../../shared/shared.module';

const Modules = [
  SharedModule, PagingPageModule, SelectPicturePageModule,
  TransitionDemoPageModule, ModalScalePageModule, ModalFromRightPageModule,
  CityPickerModule, CalendarModule
];

const Components = [
  DemoPage, PermissionDemoPage, PatrolTaskPage, CustomerListPage,
  CustomIconDemoPage, ChartjsDemoPage,
  EchartsDemoPage, SelectPicDemoPage, CustomPipeDemo, CropPicDemoPage,
  CityPickerDemoPage, CalendarDemoPage, FileCacheDemoPage,
  QrcodeDemoPage, AllowleverDemoPage
];

const Services = [
  DemoService
];

@NgModule({
  imports: [...Modules],
  declarations: [...Components, ...pipes],
  entryComponents: [...Components],
  providers: [...Services],
  exports: []
})
export class DemoModule {
}
