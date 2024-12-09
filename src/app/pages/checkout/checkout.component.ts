import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Product } from '../../models/product.model';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container checkout-container">
      <h2>Finalizar Compra</h2>
      
      <div *ngIf="cartItems.length === 0" class="empty-cart">
        <p>Seu carrinho está vazio.</p>
        <button 
          class="btn blue" 
          routerLink="/home"
        >
          Continuar Comprando
        </button>
      </div>

      <div *ngIf="cartItems.length > 0" class="row">
        <div class="col s12 m6">
          <h3>Resumo do Pedido</h3>
          <table class="striped">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of cartItems">
                <td>{{ item.name }}</td>
                <td>R$ {{ item.price | number:'1.2-2' }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td><strong>Total</strong></td>
                <td><strong>R$ {{ totalPrice | number:'1.2-2' }}</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div class="col s12 m6">
          <h3>Informações de Entrega</h3>
          <form (ngSubmit)="onSubmit()">
            <div class="input-field">
              <input 
                id="name" 
                type="text" 
                [(ngModel)]="order.customerName" 
                name="name" 
                required
              >
              <label for="name">Nome Completo</label>
            </div>

            <div class="input-field">
              <input 
                id="email" 
                type="email" 
                [(ngModel)]="order.customerEmail" 
                name="email" 
                required
              >
              <label for="email">Email</label>
            </div>

            <div class="input-field">
              <input 
                id="street" 
                type="text" 
                [(ngModel)]="order.shippingAddress.street" 
                name="street" 
                required
              >
              <label for="street">Endereço</label>
            </div>

            <div class="row">
              <div class="input-field col s6">
                <input 
                  id="city" 
                  type="text" 
                  [(ngModel)]="order.shippingAddress.city" 
                  name="city" 
                  required
                >
                <label for="city">Cidade</label>
              </div>
              <div class="input-field col s6">
                <input 
                  id="state" 
                  type="text" 
                  [(ngModel)]="order.shippingAddress.state" 
                  name="state" 
                  required
                >
                <label for="state">Estado</label>
              </div>
            </div>

            <div class="input-field">
              <input 
                id="zipCode" 
                type="text" 
                [(ngModel)]="order.shippingAddress.zipCode" 
                name="zipCode" 
                required
              >
              <label for="zipCode">CEP</label>
            </div>

            <div class="input-field">
              <select 
                [(ngModel)]="order.paymentMethod" 
                name="paymentMethod" 
                required
                class="browser-default"
              >
                <option value="" disabled>Selecione o Método de Pagamento</option>
                <option value="credit_card">Cartão de Crédito</option>
                <option value="pix">PIX</option>
                <option value="boleto">Boleto</option>
              </select>
            </div>

            <button 
              type="submit" 
              class="btn blue waves-effect waves-light full-width" 
              [disabled]="!isFormValid()"
            >
              Finalizar Pedido
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checkout-container {
      margin-top: 20px;
    }
    .full-width {
      width: 100%;
    }
    .empty-cart {
      text-align: center;
      padding: 20px;
    }
  `]
})
export class CheckoutComponent implements OnInit {
  cartItems: Product[] = [];
  totalPrice: number = 0;
  order: Order = {
    items: [],
    total: 0,
    customerName: '',
    customerEmail: '',
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    paymentMethod: 'credit_card',
    status: 'pending',
    createdAt: new Date()
  };

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.totalPrice = items.reduce((sum, item) => sum + item.price, 0);
      this.order.items = items.map(item => ({
        product: item,
        quantity: 1,
        subtotal: item.price
      }));
      this.order.total = this.totalPrice;
    });
  }

  isFormValid(): boolean {
    return !!(
      this.order.customerName && 
      this.order.customerEmail && 
      this.order.shippingAddress.street && 
      this.order.shippingAddress.city && 
      this.order.shippingAddress.state && 
      this.order.shippingAddress.zipCode && 
      this.order.paymentMethod
    );
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.orderService.createOrder(this.order).subscribe(
        createdOrder => {
          // Clear cart after successful order
          this.cartItems.forEach(item => this.cartService.removeFromCart(item));
          
          // Navigate to order confirmation page
          this.router.navigate(['/order-confirmation', createdOrder.id]);
        },
        error => {
          console.error('Erro ao criar pedido', error);
          // Handle error (show toast, etc.)
        }
      );
    }
  }
}
