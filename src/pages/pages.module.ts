import { DemoModule } from './demo/demo.module';
import { NgModule } from '@angular/core';
import { TabsModule } from "./tabs/tabs.module";
import { HomeModule } from "./home/home.module";
import { ContactModule } from './contact/contact.module';
import { AboutModule } from './about/about.module';
import { MineModule } from './mine/mine.module';

const Modules = [
    TabsModule,
    HomeModule,
    ContactModule,
    MineModule,
    DemoModule
];

@NgModule({
    imports: [...Modules],
    exports: [],
    declarations: [],
    providers: [],
})
export class PagesModule { }
