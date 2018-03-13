
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticeService } from './notice.service';
import { ModalService } from './modal.service';
import { FileService } from './file.service';
import { LoggerService } from './logger.service';
import { VersionService } from './version.service';
import { PushService } from './push.service';
import { NativeService } from './native.service';
import { StartupService } from './startup.service';
import { StorageService } from './storage.service';

const SERVICES = [
  NoticeService,
  ModalService,
  FileService,
  LoggerService,
  VersionService,
  PushService,
  NativeService,
  StartupService,
  StorageService
];

@NgModule({
  imports: [],
  exports: [],
  providers: [
    ...SERVICES
  ]
})
export class UtilsModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: UtilsModule,
      providers: [...SERVICES]
    };
  }
}
