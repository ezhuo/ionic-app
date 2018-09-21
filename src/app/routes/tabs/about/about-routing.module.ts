import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutPage } from './about';
import { PopoverPage } from './about-popover/about-popover';


const routes: Routes = [
    {
        path: '',
        component: AboutPage,
    },
];

export const routedComponents = [AboutPage];

export const entryComponents = [PopoverPage];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AboutPageRoutingModule {}
