import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, Config } from "ionic-angular";

import { CoreModule } from '../core/core.module';
import { PagesModule } from "../pages/pages.module";
import { AppComponent } from "./app.component";
import { ModalFromRightEnter, ModalFromRightLeave, ModalScaleEnter, ModalScaleLeave } from "./modal-transitions";

const Components = [AppComponent]
@NgModule({
  declarations: [...Components],
  imports: [
    CoreModule.forRoot(),
    BrowserModule,
    IonicModule.forRoot(AppComponent, {
      mode: 'ios',//android是'md',
      iconMode: 'ios',
      backButtonText: ''
    }),
    PagesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [...Components],
  providers: []
})
export class AppModule {

  constructor(public config: Config) {
    this.setCustomTransitions();
  }

  private setCustomTransitions() {
    this.config.setTransition('modal-from-right-enter', ModalFromRightEnter);
    this.config.setTransition('modal-from-right-leave', ModalFromRightLeave);
    this.config.setTransition('modal-scale-enter', ModalScaleEnter);
    this.config.setTransition('modal-scale-leave', ModalScaleLeave);
  }

}
