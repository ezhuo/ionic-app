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

  constructor(
    public user: UserService
  ) { }
}
