import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StripePaymentPageRoutingModule } from './stripe-payment-routing.module';

import { StripePaymentPage } from './stripe-payment.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StripePaymentPageRoutingModule,
        TranslateModule
    ],
  declarations: [StripePaymentPage]
})
export class StripePaymentPageModule {}
