import { NgModule } from '@angular/core';

import { TestModule } from "./test/test.module";
import { DemoModule } from "./demo/demo.module";
import { TabModule } from "./tabs/tab.module";
import { HomeModule } from "./home/home.module";
import { MineModule } from "./mine/mine.module";

@NgModule({
    imports: [
        TabModule,
        HomeModule,
        DemoModule,
        MineModule,
        TestModule],
    exports: [],
    declarations: [],
    providers: [],
})
export class PagesModule { }
