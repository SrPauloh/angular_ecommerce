import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<Product[]>([]);

  constructor(private router: Router) {}

  addToCart(product: Product) {
    const currentItems = this.cartItems.getValue();
    const updatedItems = [...currentItems, product];
    this.cartItems.next(updatedItems);
  }

  removeFromCart(product: Product) {
    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems.filter(item => item.id !== product.id);
    this.cartItems.next(updatedItems);
  }

  getCartItems() {
    return this.cartItems;
  }

  navigateToCheckout() {
    if (this.cartItems.getValue().length > 0) {
      this.router.navigate(['/checkout']);
    }
  }
}