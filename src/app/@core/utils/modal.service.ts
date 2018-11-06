import { Injectable, Injector } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';

/**
 * 对话框辅助类
 */
@Injectable({
    providedIn: 'root',
  })
export class ModalService {
    private __modalList: any[] = [];
    constructor(private injector: Injector) {}

    get modalCtrl() {
        return this.injector.get(ModalController);
    }

    get popoverCtrl() {
        return this.injector.get(PopoverController);
    }

    async create(comp: any, params?: any, options?: any) {
        const __modal = await this.modalCtrl.create({
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

    clearModal() {
        this.__modalList.forEach(res => {
            if (res) (res as any).dismiss();
        });
        this.__modalList = [];
    }

    async closePopover() {
        try {
            const element = await this.popoverCtrl.getTop();
            if (element) {
                return element.dismiss();
            }
        } catch (error) {
            return error;
        }
        return false;
    }

    async closeModal() {
        try {
            const element = await this.modalCtrl.getTop();
            if (element) {
                return element.dismiss();
            }
        } catch (error) {
            return error;
        }
        return false;
    }
}
