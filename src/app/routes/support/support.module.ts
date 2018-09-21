import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SupportPage } from './support';
import { SupportPageRoutingModule } from './support-routing.module';

@NgModule({
    imports: [SharedModule, SupportPageRoutingModule],
    declarations: [SupportPage],
})
export class SupportModule {}
