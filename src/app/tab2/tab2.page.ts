import { Component } from '@angular/core';
import {ApiCallService} from "../services/api-call.service";
import {Router} from "@angular/router";
import {CartManagerService} from "../services/cart-manager.service";
import {BehaviorSubject} from "rxjs";
import {TabsPage} from "../tabs/tabs.page";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  products: any = [{}];
  categories: any = [];

  constructor(private cm: CartManagerService, private acs: ApiCallService, private router: Router, private ts: TabsPage) {
    this.acs.ListCategories().then((res) => {
      this.categories = res;
    });

    this.acs.LatestProducts().then((res) => {
      this.products = res;
    })
  }

  goToDetail(product_id: number) {
    this.router.navigate(['product-detail/' + product_id]);
  }

  goToProductList(cat_id: number) {
    this.router.navigate(['category-detail/' + cat_id]);
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.acs.ListCategories().then((res) => {
        this.categories = res;
      });

      this.acs.LatestProducts().then((res) => {
        this.products = res;
      })
      // @ts-ignore
      event.target.complete();
    }, 2000);
  }

  addToCart(product:any) {
    this.cm.addToCart(product);
    this.ts.countElements += 1
  }

}
