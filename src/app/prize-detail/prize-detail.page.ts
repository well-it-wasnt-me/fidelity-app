import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiCallService} from "../services/api-call.service";
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-prize-detail',
  templateUrl: './prize-detail.page.html',
  styleUrls: ['./prize-detail.page.scss'],
})
export class PrizeDetailPage implements OnInit {
  prize = {
    "prize_picture": "",
    "prize_name": "",
    "prize_points": 0,
    "prize_descr": "",
    "p_prod_id": 0
  }

  constructor(private route: ActivatedRoute, private acs: ApiCallService,private actionSheetController: ActionSheetController) {
    let prize_id = <number><unknown>this.route.snapshot.paramMap.get('id');
    this.acs.prizeDetail(prize_id).then((res) => {
      this.prize = res[0];
    })
  }

  async ngOnInit() {
  }
  async claim(prize_id: number) {
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
