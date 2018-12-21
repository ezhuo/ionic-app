import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemoPage } from './default/demo';
import { NativeDemoPage } from './native-demo/native-demo';

import { PaginationDemoPage } from './pagination-demo/pagination-demo';
import { CustomIconDemoPage } from './custom-icon-demo/custom-icon-demo';
import { SelectPicDemoPage } from './select-pic-demo/select-pic-demo';

import { TransitionDemoPage } from './transition-demo/transition-demo';
import { ModalScalePage } from './transition-demo/modal-scale/modal-scale';
import { ModalFromRightPage } from './transition-demo/modal-from-right/modal-from-right';

import { CropPicDemoPage } from './crop-pic-demo/crop-pic-demo';
import { CityPickerDemoPage } from './city-picker-demo/city-picker-demo';
import { CalendarDemoPage } from './calendar-demo/calendar-demo';
import { FileCacheDemoPage } from './file-cache-demo/file-cache-demo';
import { EchartsDemoPage } from './echarts-demo/echarts-demo';
import { PermissionDemoPage } from './permission-demo/permission-demo';
import { QrcodeDemoPage } from './qrcode-demo/qrcode-demo';
import { AllowleverDemoPage } from './allowlever-demo/allowlever-demo';

export const routes: Routes = [
  {
    path: '',
    component: DemoPage,
  },
  {
    path: 'permission',
    component: PermissionDemoPage,
  },
  {
    path: 'native',
    component: NativeDemoPage,
  },
  {
    path: 'pagination',
    component: PaginationDemoPage,
  },
  {
    path: 'customIcon',
    component: CustomIconDemoPage,
  },
  {
    path: 'echarts',
    component: EchartsDemoPage,
  },
  {
    path: 'selectPic',
    component: SelectPicDemoPage,
  },
  {
    path: 'cropPic',
    component: CropPicDemoPage,
  },
  {
    path: 'pageTransition',
    component: TransitionDemoPage,
  },
  {
    path: 'cityPicker',
    component: CityPickerDemoPage,
  },
  {
    path: 'calendar',
    component: CalendarDemoPage,
  },
  {
    path: 'fileCache',
    component: FileCacheDemoPage,
  },
  {
    path: 'qrCode',
    component: QrcodeDemoPage,
  },
  {
    path: 'alloylever',
    component: AllowleverDemoPage,
  },
];

export const routedComponents = [
  DemoPage,
  NativeDemoPage,
  PaginationDemoPage,
  CustomIconDemoPage,
  SelectPicDemoPage,
  TransitionDemoPage,
  CropPicDemoPage,
  CityPickerDemoPage,
  CalendarDemoPage,
  FileCacheDemoPage,
  EchartsDemoPage,
  PermissionDemoPage,
  QrcodeDemoPage,
  AllowleverDemoPage,
];

export const entryComponents = [ModalScalePage, ModalFromRightPage];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoRoutingModule {}
