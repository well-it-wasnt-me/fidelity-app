import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrizeDetailPageRoutingModule } from './prize-detail-routing.module';

import { PrizeDetailPage } from './prize-detail.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PrizeDetailPageRoutingModule,
        TranslateModule
    ],
  declarations: [PrizeDetailPage]
})
export class PrizeDetailPageModule {}
