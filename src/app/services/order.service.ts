import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Order } from '../models/order.model';
import { CartService } from './cart.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  private currentOrderSubject = new BehaviorSubject<Order | null>(null);

  constructor(private cartService: CartService) {}

  createOrder(orderDetails: Partial<Order>): Observable<Order> {
    const cartItems = this.cartService.getCartItems().getValue();
    
    const newOrder: Order = {
      id: Date.now(), // Simple unique ID generation
      items: cartItems.map(product => ({
        product,
        quantity: 1, // Default quantity, can be improved later
        subtotal: product.price
      })),
      total: cartItems.reduce((sum, product) => sum + product.price, 0),
      customerName: orderDetails.customerName || '',
      customerEmail: orderDetails.customerEmail || '',
      shippingAddress: orderDetails.shippingAddress || {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      },
      paymentMethod: orderDetails.paymentMethod || 'credit_card',
      status: 'pending',
      createdAt: new Date()
    };

    const currentOrders = this.ordersSubject.getValue();
    this.ordersSubject.next([...currentOrders, newOrder]);
    this.currentOrderSubject.next(newOrder);

    // Explicitly convert to Observable<Order>
    return of(newOrder) as Observable<Order>;
  }

  getCurrentOrder(): Observable<Order | null> {
    return this.currentOrderSubject.asObservable();
  }

  getAllOrders(): Observable<Order[]> {
    return this.ordersSubject.asObservable();
  }

  clearCurrentOrder() {
    this.currentOrderSubject.next(null);
  }
}
