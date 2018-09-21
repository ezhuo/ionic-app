import { Component, Injector,ViewEncapsulation } from '@angular/core';
import { IndexControl } from '@core';

/**
 * Generated class for the TaskPatrolPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-patrol-task',
    templateUrl: 'patrol-task.html',
    encapsulation: ViewEncapsulation.None,
})
export class PatrolTaskPage extends IndexControl {
    // 登录用户按钮权限code集合
    buttonCodes = [];

    constructor(protected injector: Injector) {
        super(injector);
        // 从后台获取当前登录用户的按钮权限
        //   this.commonService.getResource(3).subscribe(res => {
        //     this.buttonCodes = res.map(item => item.code);
        // });
    }

    click() {
        this.noticeSrv.alertInfo('开发中...');
    }

    assertButtonPermission(code) {
        return this.buttonCodes.indexOf(code) != -1;
    }
}
