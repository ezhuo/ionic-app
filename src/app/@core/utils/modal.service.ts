import { Injectable, Injector } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';

/**
 * 对话框辅助类
 */
@Injectable()
export class ModalService {
    private __modal: any;
    constructor(private injector: Injector) {}

    get modalCtl() {
        return this.injector.get(ModalController);
    }

    get popoverCtl() {
        return this.injector.get(PopoverController);
    }

    async create(comp: any, params?: any, options?: any) {
        this.__modal = await this.modalCtl.create({
            mode: 'ios',
            component: comp,
            componentProps: params,
        });
        return await this.__modal.present();
    }

    close() {
        if (this.__modal) return this.modalCtl.dismiss({}, undefined, null);
    }
}
