import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiCallService} from "../services/api-call.service";
import {CartManagerService} from "../services/cart-manager.service";

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.page.html',
  styleUrls: ['./category-detail.page.scss'],
})
export class CategoryDetailPage implements OnInit {
  products: any = [];
  results: any = [];
  constructor(private cm: CartManagerService, private route: ActivatedRoute, private acs: ApiCallService, private router: Router) {
    let cat_id = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.acs.ListProducts(cat_id).then((res) => {
      this.products = res;
      this.results = res;
    })
  }

  ngOnInit() {
  }

  goToDetail(prod_id: number) {
    this.router.navigate(['/product-detail/'+prod_id]);
  }

  addToCart(prod: any) {
    this.cm.addToCart(prod)
  }

  handleSearch($event:any) {
    const query = $event.target.value.toLowerCase();
    this.products = this.results.filter(
      (d: any) =>
        d.prod_name.toLowerCase().indexOf(query) > -1 || d.prod_descr.toLowerCase().indexOf(query) > 1
    );
  }
}
