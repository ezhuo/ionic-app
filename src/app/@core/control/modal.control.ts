import { OnInit, OnDestroy, Injector } from '@angular/core';
import { AppControl } from './app.control';
import { DataSource } from '../model/app.d';

export class ModalControl extends AppControl implements OnInit, OnDestroy {
  constructor(protected injector: Injector, protected child?: Function) {
    super(injector, child);
  }

  ngOnInit() {
    super.ngOnInit();
    this.appFunc.__getPrimaryKeyValue();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  modalClose(data?: any, role?: string, id?: string) {
    this.modalSrv.close(data, role, id);
  }

  get modalTitle() {
    if (this.modalData.title) {
      return this.modalData.title;
    } else {
      return this.dataSource.val ? '编辑' : '添加';
    }
  }

  protected __init__(
    child: Object | Function,
    dataSource?: DataSource,
    params?: any,
  ) {
    return super.__init__(child, dataSource, params);
  }


}
