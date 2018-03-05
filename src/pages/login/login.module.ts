import { NgModule } from '@angular/core';
import { LoginPage } from './login';
import { SharedModule } from '../../shared/shared.module';
import { IonicPageModule } from 'ionic-angular';

const Modules = [
  SharedModule, IonicPageModule.forChild(LoginPage)
];

const Components = [
  LoginPage
];

const Services = [
];

@NgModule({
  imports: [...Modules],
  declarations: [...Components],
  entryComponents: [...Components],
  providers: [...Services],
  exports: []
})
export class LoginModule {
}
