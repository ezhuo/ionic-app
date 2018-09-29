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
        path: 'mine',
        component: TabsMine,
        outlet: 'mine',
    },
    {
        path: 'mine/about',
        component: TabsMineAbout,
        outlet: 'mine',
    },
    {
        path: 'mine/about/update-log',
        component: TabsMineUpdateLog,
        outlet: 'mine',
    },
    {
        path: 'mine/about/feed-back-list',
        component: TabsMineFeedBackList,
        outlet: 'mine',
    },
    {
        path: 'mine/about/feed-back-list',
        component: TabsMineFeedBackList,
        outlet: 'mine',
    },
    {
        path: 'mine/setting',
        component: TabsMineSetting,
        outlet: 'mine',
    },
    {
        path: 'mine/setting/change-password',
        component: TabsMineChangePassword,
        outlet: 'mine',
    },

    {
        path: 'mine/map',
        component: TabsMineWorkMap,
        outlet: 'mine',
    },
    {
        path: 'mine/file',
        component: FileCachePage,
        outlet: 'mine',
    },
    {
        path: 'mine/edit',
        component: TabsMineEdit,
        outlet: 'mine',
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
