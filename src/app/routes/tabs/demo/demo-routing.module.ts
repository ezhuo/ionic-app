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
        path: 'demo',
        component: DemoPage,
        outlet: 'demo',
    },
    {
        path: 'permission',
        component: PermissionDemoPage,
        outlet: 'demo',
    },
    {
        path: 'native',
        component: NativeDemoPage,
        outlet: 'demo',
    },
    {
        path: 'pagination',
        component: PaginationDemoPage,
        outlet: 'demo',
    },
    {
        path: 'customIcon',
        component: CustomIconDemoPage,
        outlet: 'demo',
    },
    {
        path: 'echarts',
        component: EchartsDemoPage,
        outlet: 'demo',
    },
    {
        path: 'selectPic',
        component: SelectPicDemoPage,
        outlet: 'demo',
    },
    {
        path: 'cropPic',
        component: CropPicDemoPage,
        outlet: 'demo',
    },
    {
        path: 'pageTransition',
        component: TransitionDemoPage,
        outlet: 'demo',
    },
    {
        path: 'cityPicker',
        component: CityPickerDemoPage,
        outlet: 'demo',
    },
    {
        path: 'calendar',
        component: CalendarDemoPage,
        outlet: 'demo',
    },
    {
        path: 'fileCache',
        component: FileCacheDemoPage,
        outlet: 'demo',
    },
    {
        path: 'qrCode',
        component: QrcodeDemoPage,
        outlet: 'demo',
    },
    {
        path: 'alloylever',
        component: AllowleverDemoPage,
        outlet: 'demo',
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
