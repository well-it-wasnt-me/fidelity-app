import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {
  currentLang: any;

  constructor(
    private translate: TranslateService,
    private storageService: StorageService
  ) {
    this.storageService.get('lang').then(
      (value: any) => {
        this.currentLang = value;
      }
    )
  }

  getDefaultLanguage(){
    if (this.currentLang) {
      this.translate.setDefaultLang(this.currentLang);
    } else {
      this.storageService.store('lang', this.translate.getBrowserLang());
      this.currentLang = this.translate.getBrowserLang();
      this.translate.setDefaultLang(this.currentLang);
    }
    return this.currentLang;
  }

  setLanguage(setLang: string) {
    this.translate.use(setLang);
    this.storageService.store('lang', setLang);
  }

  async getCurrentLang() {
    await this.storageService.get('lang').then(
      (value: any) => {
        return value;
      }
    )
  }
}
