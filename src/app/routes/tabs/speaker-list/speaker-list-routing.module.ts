import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SpeakerListPage } from './default/speaker-list';
import { SpeakerDetailPage } from './speaker-detail/speaker-detail';

import { SessionDetailPage } from '../schedule/session-detail/session-detail';

const routes: Routes = [
  {
    path: '',
    component: SpeakerListPage,
  },
  {
    path: 'session/:sessionId',
    component: SessionDetailPage,
  },
  {
    path: 'speaker-details/:speakerId',
    component: SpeakerDetailPage,
  },
];

export const routedComponents = [SpeakerListPage, SpeakerDetailPage];

export const entryComponents = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpeakerListPageRoutingModule {}
