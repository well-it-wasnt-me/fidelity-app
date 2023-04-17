import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiCallService} from "../services/api-call.service";
import {CartManagerService} from "../services/cart-manager.service";
import {TabsPage} from "../tabs/tabs.page";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  product = {
    prod_id: 0,
    prod_name: "",
    prod_descr: "",
    prod_picture: "",
    prod_price: 0,
    quantity: 0
  }

  constructor(private cm: CartManagerService, private ts: TabsPage, private route: ActivatedRoute, private acs: ApiCallService) {
    let product_id = <number><unknown>this.route.snapshot.paramMap.get('id');
    this.acs.productDetail(product_id).then((res) => {
      this.product = res[0];
    })
  }

  ngOnInit() {
  }

  addToCart(product: any) {
    this.cm.addToCart(product);
    this.ts.countElements += 1
    alert("Aggiunto al carrello :)");
  }
}
