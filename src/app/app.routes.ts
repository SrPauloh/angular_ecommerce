import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderConfirmationComponent } from './pages/order-confirmation/order-confirmation.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', loadComponent: () => 
    import('./pages/products/products.component').then(m => m.ProductsComponent) },
  { path: 'cart', loadComponent: () => 
    import('./pages/cart/cart.component').then(m => m.CartComponent) },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-confirmation/:id', component: OrderConfirmationComponent }
];