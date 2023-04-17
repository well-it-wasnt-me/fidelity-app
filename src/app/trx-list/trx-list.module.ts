import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrxListPageRoutingModule } from './trx-list-routing.module';

import { TrxListPage } from './trx-list.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TrxListPageRoutingModule,
        TranslateModule
    ],
  declarations: [TrxListPage]
})
export class TrxListPageModule {}
