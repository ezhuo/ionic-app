import { PagingPageModule } from './../../../theme/components/paging/paging.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PaginationDemoPage } from './pagination-demo';

@NgModule({
    imports: [IonicPageModule.forChild(PaginationDemoPage), PagingPageModule],
    exports: [],
    declarations: [PaginationDemoPage],
    providers: [],
})
export class PaginationDemoModule { }
