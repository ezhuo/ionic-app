import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalService } from '@core';
import { AutosizeDirective } from './directives';
import {
    FileCachePage,
    PagingPage,
    PreviewPicturePage,
    SelectPicturePage,
    GetLocationPage,
    MapLocation,
    Navigation,
    SearchAddress,
    WorkMapPage,
} from './component';

const MODULES = [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    IonicModule,
    IonicStorageModule,
];
export const COMPONENTS = [
    FileCachePage,
    PagingPage,
    PreviewPicturePage,
    SelectPicturePage,
    WorkMapPage,
    MapLocation,
    GetLocationPage,
];
export const DIRECTIVES = [AutosizeDirective];
export const PROVIDERS = [ModalService];
export const entryComponents = [Navigation, SearchAddress];
export const pipes = [];

@NgModule({
    imports: [...MODULES],
    exports: [
        ...MODULES,
        ...COMPONENTS,
        ...DIRECTIVES,
        ...entryComponents,
        ...pipes,
    ],
    declarations: [...COMPONENTS, ...DIRECTIVES, ...entryComponents, ...pipes],
    providers: [...PROVIDERS],
    entryComponents: [...entryComponents],
})
export class SharedModule {}
