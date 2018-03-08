import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { StateService } from './state.service';

@Injectable()
export class AuthGuard {
  constructor(private authService: AuthService) { }

  public checkLogin(): boolean {
    const bool = this.authService.checkAuth();
    return bool;
  }
}
