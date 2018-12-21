import { OnInit, OnDestroy, Injector } from '@angular/core';
import { AppControl } from './app.control';
import { DataSource } from '../model/app.d';

export class IndexControl extends AppControl implements OnInit, OnDestroy {
  constructor(protected injector: Injector, protected child?: Function) {
    super(injector, child);
  }

  ngOnInit() {
    super.ngOnInit();
    // 只有后台才允许记录操作日志
    if ((this.route.url + '').indexOf('/admin/') > -1) {
      this.appCase.__logs('进入');
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  protected __init__(
    child: Object | Function,
    dataSource?: DataSource,
    params?: any,
  ) {
    return super.__init__(child, dataSource, params);
  }
  
}
