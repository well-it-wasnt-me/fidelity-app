import { Component } from '@angular/core';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
import {CartManagerService} from "../services/cart-manager.service";
import {count} from "rxjs";
import {StorageService} from "../services/storage.service";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  language: any;
  cartElements = false;
  countElements: number = 0;
  constructor(private storageService: StorageService, private translateConfigService: TranslateConfigService, private translate: TranslateService,route:ActivatedRoute) {
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();

    route.params.subscribe(val => {
      this.storageService.get('my_cart').then((cart) => {
        if(cart.length > 0){
          this.cartElements = true;
          this.countElements = cart.length;
        }
      });
    });
  }

}
