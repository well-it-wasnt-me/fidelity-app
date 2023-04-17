import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StripePaymentPage } from './stripe-payment.page';

const routes: Routes = [
  {
    path: '',
    component: StripePaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StripePaymentPageRoutingModule {}
