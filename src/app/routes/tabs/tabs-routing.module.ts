import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutTabsComponent } from '@layout';
import { AuthGuard } from '@core';

import { SchedulePage } from './schedule/default/schedule';
import { SessionDetailPage } from './schedule/session-detail/session-detail';

import { SpeakerListPage } from './speaker-list/default/speaker-list';
import { SpeakerDetailPage } from './speaker-list/speaker-detail/speaker-detail';

import { routes as routesDemo } from './demo';
import { routes as routesMine } from './mine';

const routesChild: Routes = [
    {
        path: 'schedule',
        component: SchedulePage,
        outlet: 'schedule',
    },
    {
        path: 'session/:sessionId',
        component: SessionDetailPage,
        outlet: 'schedule',
    },
    // tab two
    {
        path: 'speakers',
        component: SpeakerListPage,
        outlet: 'speakers',
    },
    {
        path: 'session/:sessionId',
        component: SessionDetailPage,
        outlet: 'speakers',
    },
    {
        path: 'speaker-details/:speakerId',
        component: SpeakerDetailPage,
        outlet: 'speakers',
    },
];

const routesOther: Routes = [
    { path: '', redirectTo: 'schedule', pathMatch: 'full' },
    { path: '**', redirectTo: 'schedule' },
];

const routes: Routes = [
    {
        path: 'tabs',
        component: LayoutTabsComponent,
        canActivate: [AuthGuard],
        children: [].concat(routesChild, routesDemo, routesMine, routesOther),
    },
];

export const routedComponents = [];

export const entryComponents = [];

export const routedModules = [];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsRoutingModule {}
