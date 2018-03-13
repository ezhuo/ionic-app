import { Injectable } from '@angular/core';
import { UserService } from './users.service';
import * as config from '../public/config';

@Injectable()
export class StateService {
  public config = config;
  public app = config.app;
  public api = config.api;
  public canton = config.canton;
  public define = config.define;
  public router = config.router;
  private _showLoading: boolean = true;

  constructor(
    public userService: UserService
  ) { }


  get showLoading(): boolean {
    return this._showLoading;
  }

  set showLoading(value: boolean) {
    this._showLoading = value;
  }

}
