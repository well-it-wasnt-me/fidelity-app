import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPrizeDetailPageRoutingModule } from './category-prize-detail-routing.module';

import { CategoryPrizeDetailPage } from './category-prize-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPrizeDetailPageRoutingModule
  ],
  declarations: [CategoryPrizeDetailPage]
})
export class CategoryPrizeDetailPageModule {}
