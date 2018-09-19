import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core';

import { LayoutDefaultComponent } from '@layout';

const routes: Routes = [
    {
        path: '',
        component: LayoutDefaultComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'account',
                loadChildren: './account/account.module#AccountModule',
            },
            {
                path: 'support',
                loadChildren: './support/support.module#SupportModule',
            },
            {
                path: '',
                loadChildren: './tabs-page/tabs-page.module#TabsModule',
            },
        ],
    },
];

export const routedComponents = [];

export const entryComponents = [];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
