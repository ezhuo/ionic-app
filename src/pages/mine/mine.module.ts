import { NgModule } from '@angular/core';
import { MinePage } from './mine';
import { MineEditPage } from './mine-edit/mine-edit';
import { MineEditModalPage } from './mine-edit-modal/mine-edit-modal';
import { MineEditAvatarModalPage } from './mine-edit-avatar-modal/mine-edit-avatar-modal';
import { FeedBackPage } from "./feed-back/feed-back";
import { AboutPage } from "./about/about";
import { UpdateLogPage } from "./update-log/update-log";
import { SelectPicturePageModule } from "../../theme/components/select-picture/select-picture.module";
import { MineService } from "./MineService";
import { WorkMapPage } from "./work-map/work-map";
import { MapLocationModule } from "../../theme/components/map-component/map-location/map-location.module";
import { SettingPage } from "./setting/setting";
import { ChangePasswordPage } from "./change-password/change-password";
import { FeedBackListPage } from "./feed-back/feed-back-list";
import { PagingPageModule } from "../../theme/components/paging/paging.module";
import { FeedBackDetailPage } from "./feed-back/feed-back-detail";
import { FileCachePageModule } from "../../theme/components/file-cache/file-cache.module";
import { SharedModule } from '../../shared/shared.module';

const Modules = [
  SharedModule, SelectPicturePageModule, MapLocationModule, PagingPageModule, FileCachePageModule
];

const Components = [
  MinePage, MineEditPage, MineEditModalPage, MineEditAvatarModalPage,
  FeedBackPage, AboutPage, UpdateLogPage, WorkMapPage, SettingPage, ChangePasswordPage,
  FeedBackListPage, FeedBackDetailPage
];

const Services = [
  MineService
];

@NgModule({
  imports: [...Modules],
  declarations: [...Components],
  entryComponents: [...Components],
  providers: [...Services],
  exports: []
})
export class MineModule {
}
