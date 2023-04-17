import { Injectable } from '@angular/core';
import {Preferences} from "@capacitor/preferences";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }
  /**
   * Save element into local db
   * @param storageKey
   * @param value
   */
  async store(storageKey: string, value: any) {
    const encryptedValue = btoa(escape(JSON.stringify(value)));
    await Preferences.set({
      key: storageKey,
      value: encryptedValue
    });
  }

  /**
   * Retrieve element from local db
   * @param storageKey
   */
  async get(storageKey: string) {
    const ret = await Preferences.get({ key: storageKey });
    try {
      let decr = JSON.parse(unescape(atob(<string>ret.value)));
      return decr;
    } catch (e){
      return false;
    }
  }

  /**
   * Remove element from local db
   * @param storageKey
   */
  async removeStorageItem(storageKey: string) {
    await Preferences.remove({ key: storageKey });
  }

  /**
   * Delete local db
   */
  async clear() {
    await Preferences.clear();
  }
}
