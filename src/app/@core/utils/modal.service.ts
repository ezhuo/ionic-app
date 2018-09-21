import { Injectable, Injector } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';

/**
 * 对话框辅助类
 */
@Injectable()
export class ModalService {
    private __modalList: any[] = [];
    constructor(private injector: Injector) {}

    get modalCtl() {
        return this.injector.get(ModalController);
    }

    get popoverCtl() {
        return this.injector.get(PopoverController);
    }

    async create(comp: any, params?: any, options?: any) {
        const __modal = await this.modalCtl.create({
            mode: 'ios',
            component: comp,
            componentProps: params,
        });
        this.__modalList.push(__modal);
        await __modal.present();
        return __modal;
    }

    close(data?: any, role?: string, id?: string) {
        if (this.__modalList.length > 0) {
            return (this.__modalList.pop() as any).dismiss(data, role, id);
        }
    }
}
