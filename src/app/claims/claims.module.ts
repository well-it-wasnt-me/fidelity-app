import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaimsPageRoutingModule } from './claims-routing.module';

import { ClaimsPage } from './claims.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ClaimsPageRoutingModule,
        TranslateModule
    ],
  declarations: [ClaimsPage]
})
export class ClaimsPageModule {}
