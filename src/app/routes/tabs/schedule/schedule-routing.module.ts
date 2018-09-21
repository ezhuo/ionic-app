import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SchedulePage } from './default/schedule';
import { ScheduleFilterPage } from './schedule-filter/schedule-filter';
import { SessionDetailPage } from './session-detail/session-detail';

const routes: Routes = [
    {
        path: '',
        component: SchedulePage,
    },
];

export const routedComponents = [SchedulePage, SessionDetailPage];

export const entryComponents = [ScheduleFilterPage];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SchedulePageRoutingModule {}
