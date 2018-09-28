import { NgModule, ModuleWithProviders } from '@angular/core';
import { NoticeService } from './notice.service';
import { ModalService } from './modal.service';
import { LoggerService } from './logger.service';

const SERVICES = [NoticeService, ModalService, LoggerService];

@NgModule({
    imports: [],
    exports: [],
    providers: [],
})
export class UtilsModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: UtilsModule,
            providers: [...SERVICES],
        };
    }
}
