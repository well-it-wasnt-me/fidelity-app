import { Component, OnInit } from '@angular/core';
import {ApiCallService} from "../services/api-call.service";
import {Router} from "@angular/router";
import {ActionSheetController} from "@ionic/angular";

@Component({
  selector: 'app-prizes',
  templateUrl: './prizes.page.html',
  styleUrls: ['./prizes.page.scss'],
})
export class PrizesPage implements OnInit {
  products: any = [{}];
  categories: any = [];

  constructor(private acs: ApiCallService, private router: Router, private actionSheetController: ActionSheetController) {
    this.acs.ListPrizesCategories().then((res) => {
      this.categories = res;
    });

    this.acs.LatestPrizesProducts().then((res) => {
      this.products = res;
    })
  }

  ngOnInit() {
  }

  handleRefresh($event: any) {
    setTimeout(() => {
      this.acs.ListPrizesCategories().then((res) => {
        this.categories = res;
      });

      this.acs.LatestPrizesProducts().then((res) => {
        this.products = res;
      })
      // @ts-ignore
      $event.target.complete();
    }, 2000);
  }

  goToProductList(cat_id: any) {
    this.router.navigate(['category-prize-detail/' + cat_id]);
  }

  goToDetail(prod_id: number) {
    this.router.navigate(['prize-detail/' + prod_id]);
  }

  async checkout(prize_id: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Claiming Prize',
      subHeader: 'Are you sure you want this item ?',
      cssClass: 'basicActionSheet',
      buttons: [{
        text: 'Yes !',
        icon: 'add-circle',
        cssClass: 'settingActionSheet',
        handler: () => {
          this.acs.prizeClaim(prize_id).then((res)=> {
            alert(res.message);
          });
        }
      },
        {
          text: 'Nevermind',
          icon: 'close-circle',
          role: 'destructive',
          cssClass: 'deleteActionSheet'
        }]
    });
    await actionSheet.present();
  }
}
