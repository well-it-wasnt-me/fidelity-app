import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrxListPage } from './trx-list.page';

const routes: Routes = [
  {
    path: '',
    component: TrxListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrxListPageRoutingModule {}
