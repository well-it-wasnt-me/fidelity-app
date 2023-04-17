import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaimsPage } from './claims.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaimsPageRoutingModule {}
