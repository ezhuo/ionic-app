import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPageComponent } from './tabs-page.component';

import { AboutPage } from './about/about';

import { SchedulePage } from './schedule/schedule';
import { SessionDetailPage } from './schedule/session-detail/session-detail';

import { SpeakerListPage } from './speaker-list/speaker-list';
import { SpeakerDetailPage } from './speaker-list/speaker-detail/speaker-detail';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPageComponent,
        children: [
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

            // tab four
            {
                path: 'about',
                component: AboutPage,
                outlet: 'about',
            },
            { path: '', redirectTo: 'schedule', pathMatch: 'full' },
            { path: '**', redirectTo: 'schedule' },
        ],
    },
];

export const routedComponents = [TabsPageComponent];

export const entryComponents = [];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule {}
