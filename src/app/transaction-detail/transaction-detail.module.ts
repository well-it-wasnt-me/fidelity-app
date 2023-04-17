import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionDetailPageRoutingModule } from './transaction-detail-routing.module';

import { TransactionDetailPage } from './transaction-detail.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TransactionDetailPageRoutingModule,
        TranslateModule
    ],
  declarations: [TransactionDetailPage]
})
export class TransactionDetailPageModule {}
