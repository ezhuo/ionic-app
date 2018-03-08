import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './users.service';
import { StateService } from './state.service';

import { AuthInterceptor } from './http.interceptor';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { HttpService } from './http.service';

const SERVICES = [UserService, StateService, AuthService, HttpService, TokenService];

@NgModule({
  imports: [CommonModule],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ...SERVICES
  ]
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [...SERVICES]
    };
  }
}
