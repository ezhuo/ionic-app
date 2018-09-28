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
];
export const DIRECTIVES = [AutosizeDirective];
export const PROVIDERS = [ModalService];
export const entryComponents = [];
export const pipes = [];

@NgModule({
    imports: [...MODULES],
    exports: [...MODULES],
    declarations: [...COMPONENTS, ...DIRECTIVES, ...entryComponents, ...pipes],
    providers: [...PROVIDERS],
    entryComponents: [...entryComponents],
})
export class SharedModule {}
