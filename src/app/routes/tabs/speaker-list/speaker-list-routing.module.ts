import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SpeakerListPage } from './speaker-list';
import { SpeakerDetailPage } from './speaker-detail/speaker-detail';

const routes: Routes = [
    {
        path: '',
        component: SpeakerListPage,
    },
];

export const routedComponents = [SpeakerListPage, SpeakerDetailPage];

export const entryComponents = [];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SpeakerListPageRoutingModule {}
