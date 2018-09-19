import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export const pipes = [];
import { ModalService } from '@core';

const MODULES = [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    IonicModule,
    IonicStorageModule,
];
const COMPONENTS = [];
const DIRECTIVES = [];
const PROVIDERS = [ModalService];

@NgModule({
    imports: [...MODULES],
    exports: [...MODULES],
    declarations: [...COMPONENTS, ...DIRECTIVES],
    providers: [...PROVIDERS],
})
export class SharedModule {}
