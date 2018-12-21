import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutTabsComponent } from '@layout';
import { AuthGuard } from '@core';

const routes: Routes = [
    {
        path: 'tabs',
        component: LayoutTabsComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'schedule',
                loadChildren: './schedule/schedule.module#ScheduleModule',
            },
            {
                path: 'speakers',
                loadChildren:
                    './speaker-list/speaker-list.module#SpeakerListModule',
            },
            {
                path: 'demo',
                loadChildren: './demo/demo.module#DemoModule',
            },
            {
                path: 'mine',
                loadChildren: './mine/mine.module#MineModule',
            },
            { path: '', redirectTo: 'schedule', pathMatch: 'full' },
            { path: '**', redirectTo: 'schedule' },
        ],
    },
];

export const routedComponents = [];
export const entryComponents = [];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsRoutingModule {}
