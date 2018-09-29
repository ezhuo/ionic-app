import { Component, Injector, ElementRef, ViewChild ,ViewEncapsulation} from '@angular/core';
import { IndexControl } from '@core';
import { Subject } from 'rxjs';

@Component({
    selector: 'page-qrcode-demo',
    templateUrl: 'qrcode-demo.html',
    encapsulation: ViewEncapsulation.None,
})
export class QrcodeDemoPage extends IndexControl {
    @ViewChild('codeDiv')
    codeDiv: ElementRef;
    qrCode: any;
    text = 'http://en168.net/';

    textStream: Subject<string> = new Subject<string>();

    codeUrl = this.getCodeUrl();

    constructor(protected injector: Injector) {
        super(injector);
    }

    ionViewDidLoad() {
        this.qrCode = new QRCode(this.codeDiv.nativeElement, {
            width: 100,
            height: 100,
        });
        this.qrCode.makeCode(this.text);
    }

    ngAfterContentInit() {
        // 监听text变化,页面发布事件
        // this.textStream
        //     .debounceTime(400) // 延迟400毫秒
        //     .distinctUntilChanged() // 判断有无改变
        //     .subscribe(value => {
        //         // 订阅
        //         this.qrCode.makeCode(this.text); // 使用qrcode.js生成二维码
        //         this.codeUrl = this.getCodeUrl();
        //     });
    }

    getCodeUrl() {
        return 'http://mobile.qq.com/qrcode?width=140&url=' + this.text;
    }
}
