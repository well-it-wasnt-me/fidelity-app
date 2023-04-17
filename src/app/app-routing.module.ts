import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'transaction-detail/:id',
    loadChildren: () => import('./transaction-detail/transaction-detail.module').then( m => m.TransactionDetailPageModule)
  },
  {
    path: 'product-detail/:id',
    loadChildren: () => import('./product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
  {
    path: 'category-detail/:id',
    loadChildren: () => import('./category-detail/category-detail.module').then( m => m.CategoryDetailPageModule)
  },
  {
    path: 'stripe-payment/:subtotal',
    loadChildren: () => import('./stripe-payment/stripe-payment.module').then( m => m.StripePaymentPageModule)
  },
  {
    path: 'payment/:status',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'trx-list',
    loadChildren: () => import('./trx-list/trx-list.module').then( m => m.TrxListPageModule)
  },
  {
    path: 'prizes',
    loadChildren: () => import('./prizes/prizes.module').then( m => m.PrizesPageModule)
  },
  {
    path: 'prize-detail/:id',
    loadChildren: () => import('./prize-detail/prize-detail.module').then( m => m.PrizeDetailPageModule)
  },
  {
    path: 'category-prize-detail/:cat_id',
    loadChildren: () => import('./category-prize-detail/category-prize-detail.module').then( m => m.CategoryPrizeDetailPageModule)
  },
  {
    path: 'claims',
    loadChildren: () => import('./claims/claims.module').then( m => m.ClaimsPageModule)
  },
  {
    path: 'claim-detail/:claim_id',
    loadChildren: () => import('./claim-detail/claim-detail.module').then( m => m.ClaimDetailPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
