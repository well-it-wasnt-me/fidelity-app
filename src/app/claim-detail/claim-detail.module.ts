import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaimDetailPageRoutingModule } from './claim-detail-routing.module';

import { ClaimDetailPage } from './claim-detail.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ClaimDetailPageRoutingModule,
        TranslateModule
    ],
  declarations: [ClaimDetailPage]
})
export class ClaimDetailPageModule {}
