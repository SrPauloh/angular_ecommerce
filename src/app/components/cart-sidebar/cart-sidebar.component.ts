import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.css']
})
export class CartSidebarComponent {
  @Input() isOpen = false;
  @Output() closeSidebar = new EventEmitter<void>();

  constructor(
    private cartService: CartService, 
    private router: Router
  ) {}

  get cartItems(): Product[] {
    return this.cartService.getCartItems().getValue();
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  closeCart() {
    this.closeSidebar.emit();
  }

  proceedToCheckout() {
    this.closeCart();
    this.router.navigate(['/checkout']);
  }

  goToProductDetail(productId: number) {
    this.closeCart();
    this.router.navigate(['/product', productId.toString()]);
  }
}
