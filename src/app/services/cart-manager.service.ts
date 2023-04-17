import { Injectable } from '@angular/core';
import {StorageService} from "./storage.service";
import {TabsPage} from "../tabs/tabs.page";

@Injectable({
  providedIn: 'root'
})
export class CartManagerService {
  my_cart: any = [];
  subtotal: number = 0.00;
  constructor(private ts: TabsPage, private storageService: StorageService) {
    this.storageService.get('my_cart').then( (mc) => {
        if(!mc){
          this.my_cart = [];
        }  else {
          this.my_cart = mc;
        }
      });
  }

  /**
   * Add an item to the cart
   * @param product
   */
  addToCart(product: any){
    if(product.qt === null || product.qt === undefined){
      product.qt = 1;
    }
    if(this.my_cart.length > 0){
      for(var i=0; i < this.my_cart.length; i++){
        if(this.my_cart[i].prod_id === product.prod_id){
          if(isNaN(this.my_cart[i].qt)){
            this.my_cart[i].qt = 1;
          } else {
            this.my_cart[i].qt++;
          }
        }
      }
    } else {
      this.my_cart.push(product);
    }
    this.storageService.store('my_cart', this.my_cart);
    this.ts.cartElements = this.my_cart.length > 0;
    this.ts.countElements = this.my_cart.length;
  }

  /**
   * Remove an item from the cart
   * @param item
   */
  removeFromCart(item: any){
    for(var i=0; i<this.my_cart.length; i++){
      if(this.my_cart[i].prod_id === item.prod_id){
        let qt = this.my_cart[i].qt--;
        if(qt <= 0){
          this.my_cart = this.my_cart.filter((element: any) => element !== item)
          this.my_cart.splice(this.my_cart.indexOf(item), 1);
        }
      }
    }
    this.storageService.store('my_cart', this.my_cart);
    this.ts.countElements = this.my_cart.length;
    this.ts.cartElements = this.my_cart.length > 0;
  }

  /**
   * Return the cart
   */
  async listProducts(){
    let cart;
    await this.storageService.get('my_cart').then( (mc) => {
      return cart = mc;
    });
    return cart;
  }

  /**
   * Return the total to pay
   * accounting for the quantity
   * per each item
   */
  cartTotalToPay(){
    this.subtotal = 0;
    for(var i=0; i<this.my_cart.length; i++){
      this.subtotal += ( this.my_cart[i].prod_price / 100 ) * this.my_cart[i].qt
    }
  }

  /**
   * Destriy a cart
   */
  clearCart(){
    this.storageService.removeStorageItem("my_cart");
  }
}
