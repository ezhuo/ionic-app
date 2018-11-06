import { Injectable, Injector } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root',
  })
export class StorageService {
    constructor(protected injector: Injector) {}

    get storage() {
        return this.injector.get(Storage);
    }
    async set(key, value) {
        return await this.storage.set(key, value);
    }
    async get(key) {
        return await this.storage.get(key);
    }
    async remove(key) {
        return await this.storage.remove(key);
    }
    async clear() {
        return await this.storage.clear();
    }
    async exists(key) {
        const store: string[] = await this.storage.keys();
        return store.indexOf(key) > -1;
    }
    keys() {
        return this.storage.keys;
    }
    forEach() {
        return this.storage.forEach;
    }
}
