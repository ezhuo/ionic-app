import { Component, Injector ,ViewEncapsulation} from '@angular/core';
import { IndexControl } from '@core';
// import { CommonService } from '../../../service/CommonService';
import { PatrolTaskPage } from './patrol-task/patrol-task';
import { CustomerListPage } from './customer-list/customer-list';

/**
 * Generated class for the PermissionDemoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-permission-demo',
    templateUrl: 'permission-demo.html',
    encapsulation: ViewEncapsulation.None,
})
export class PermissionDemoPage extends IndexControl {
    // 定义app所有菜单关系,其中code对应后台资源配置的code
    menuRelation = [
        {
            code: 'app_menu_patrol',
            name: '巡检',
            url: '',
            icon: 'build',
            color: '#63c6e6',
        },
        {
            code: 'app_menu_repair',
            name: '消缺',
            url: '',
            icon: 'car',
            color: '#868fe7',
        },
    ];

    // 当前登录用户拥有的菜单
    menu = [
        {
            code: 'app_menu_customer',
            name: '客户档案',
            url: '',
            icon: 'people',
            color: '#eec56d',
        },
    ];

    // constructor2(
    //     public navCtrl: NavController,
    //     public navParams: NavParams,
    //     public nativeService: NativeService,
    //     public commonService: CommonService,
    // ) {}

    constructor(protected injector: Injector) {
        super(injector);

        const menu = [];
        // 从后台获取当前登录用户的菜单资源
        // this.commonService.getResource(1).subscribe(res => {
        //     for (const item of res) {
        //         for (const _menuRelation of this.menuRelation) {
        //             if (item.code == _menuRelation.code) {
        //                 menu.push(_menuRelation);
        //             }
        //         }
        //     }
        //     this.menu = this.menu.concat(menu);
        // });
    }

    navigation(code) {
        switch (code) {
            case 'app_menu_patrol':
                // this.ionNav.push(PatrolTaskPage);
                break;
            case 'app_menu_customer':
                // this.navCtrl.push(CustomerListPage);
                break;
            default:
                this.noticeSrv.alertInfo('未找到页面');
        }
    }
}
