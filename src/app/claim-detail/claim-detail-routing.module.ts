import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaimDetailPage } from './claim-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaimDetailPageRoutingModule {}
