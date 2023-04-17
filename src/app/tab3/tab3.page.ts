import { Component } from '@angular/core';
import {CartManagerService} from "../services/cart-manager.service";
import {StorageService} from "../services/storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TabsPage} from "../tabs/tabs.page";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  products: Array<any> = [];
  totalToPay: any = 0.00;

  constructor(public cm: CartManagerService, private storageService: StorageService,route:ActivatedRoute, private ts: TabsPage, private router: Router) {
    route.params.subscribe(val => {
      this.updateProductList()
      this.getTotalAmount();
    });
  }

  getTotalAmount(){
    this.cm.cartTotalToPay();
  }
  updateProductList(){
    this.storageService.get('my_cart').then((res) => this.products = res);
  }

  goToOrderBook() {
    this.router.navigate(['/stripe-payment/'+ this.cm.subtotal]);

  }

  updateQuantity(type: string, item: any) {
    if(type === 'plus'){
      this.cm.addToCart(item)
      this.updateProductList();
      this.getTotalAmount();
      this.ts.countElements += 1
    } else if(type === 'minus'){
      this.cm.removeFromCart(item)
      this.updateProductList();
      this.getTotalAmount();
      this.ts.countElements -= 1
    } else {
      console.log("Unknown type");
    }

    this.storageService.get('my_cart').then((res) => { this.products = res; console.log(res)});
  }
}
