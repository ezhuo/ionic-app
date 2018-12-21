import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsMine } from './default/mine';
import { TabsMineAbout } from './about/about';
import { TabsMineUpdateLog } from './about/update-log/update-log';

import { TabsMineFeedBackList } from './feed-back/feed-back-list';
import { TabsMineFeedBackDetail } from './feed-back/feed-back-detail';
import { TabsMineFeedBack } from './feed-back/feed-back';

import { TabsMineSetting } from './setting/setting';
import { TabsMineChangePassword } from './setting/change-password/change-password';

import { TabsMineWorkMap } from './work-map/work-map';

import { TabsMineEdit } from './mine-edit/mine-edit';
import { TabsMineEditModal } from './mine-edit/mine-edit-modal/mine-edit-modal';
import { TabsMineEditAvatarModal } from './mine-edit/mine-edit-avatar-modal/mine-edit-avatar-modal';

import { PopoverPage } from './about-popover/about-popover';
import { FileCachePage } from '@shared';

export const routes: Routes = [
  {
    path: '',
    component: TabsMine,
  },
  {
    path: 'about',
    component: TabsMineAbout,
  },
  {
    path: 'about/update-log',
    component: TabsMineUpdateLog,
  },
  {
    path: 'about/feed-back-list',
    component: TabsMineFeedBackList,
  },
  {
    path: 'about/feed-back-list',
    component: TabsMineFeedBackList,
  },
  {
    path: 'setting',
    component: TabsMineSetting,
  },
  {
    path: 'setting/change-password',
    component: TabsMineChangePassword,
  },
  {
    path: 'map',
    component: TabsMineWorkMap,
  },
  {
    path: 'file',
    component: FileCachePage,
  },
  {
    path: 'edit',
    component: TabsMineEdit,
  },
];

export const routedComponents = [
  TabsMine,
  TabsMineAbout,
  TabsMineUpdateLog,
  TabsMineFeedBackList,

  TabsMineSetting,
  TabsMineWorkMap,
  TabsMineEdit,
];

export const entryComponents = [
  TabsMineFeedBackDetail,
  TabsMineFeedBack,
  TabsMineChangePassword,

  TabsMineEditModal,
  TabsMineEditAvatarModal,
  PopoverPage,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MineRoutingModule {}
