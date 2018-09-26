import { Injectable, Injector } from '@angular/core';
import {
    Events,
    MenuController,
    NavController,
    NavParams,
} from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class IonicService {
    constructor(protected injector: Injector) {}

    get storage() {
        return this.injector.get(Storage);
    }

    get events() {
        return this.injector.get(Events);
    }

    get menu() {
        return this.injector.get(MenuController);
    }

    get nav() {
        return this.injector.get(NavController);
    }

    get navParams() {
        return this.injector.get(NavParams);
    }

    async closeMenu() {
        try {
            const element = await this.menu.getOpen();
            if (element !== null) {
                return this.menu.close();
            }
        } catch (error) {
            return error;
        }
        return false;
    }
}
