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
        path: 'demo/permission',
        component: PermissionDemoPage,
        outlet: 'demo',
    },
    {
        path: 'demo/native',
        component: NativeDemoPage,
        outlet: 'demo',
    },
    {
        path: 'demo/pagination',
        component: PaginationDemoPage,
        outlet: 'demo',
    },
    {
        path: 'demo/customIcon',
        component: CustomIconDemoPage,
        outlet: 'demo',
    },
    {
        path: 'demo/echarts',
        component: EchartsDemoPage,
        outlet: 'demo',
    },
    {
        path: 'demo/selectPic',
        component: SelectPicDemoPage,
        outlet: 'demo',
    },
    {
        path: 'demo/cropPic',
        component: CropPicDemoPage,
        outlet: 'demo',
    },
    {
        path: 'demo/pageTransition',
        component: TransitionDemoPage,
        outlet: 'demo',
    },
    {
        path: 'demo/cityPicker',
        component: CityPickerDemoPage,
        outlet: 'demo',
    },
    {
        path: 'demo/calendar',
        component: CalendarDemoPage,
        outlet: 'demo',
    },
    {
        path: 'demo/fileCache',
        component: FileCacheDemoPage,
        outlet: 'demo',
    },
    {
        path: 'demo/qrCode',
        component: QrcodeDemoPage,
        outlet: 'demo',
    },
    {
        path: 'demo/alloylever',
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
