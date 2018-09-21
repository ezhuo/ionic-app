import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsMine } from './default/mine';

export const routes: Routes = [
    {
        path: 'mine',
        component: TabsMine,
        outlet: 'mine',
    },
];

export const routedComponents = [TabsMine];

export const entryComponents = [];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MineRoutingModule {}
