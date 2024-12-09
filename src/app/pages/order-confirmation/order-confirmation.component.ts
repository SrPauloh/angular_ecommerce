import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container order-confirmation">
      <div class="card-panel green lighten-4" *ngIf="order">
        <h2 class="green-text text-darken-2">Pedido Confirmado!</h2>
        <p>Número do Pedido: <strong>#{{ order.id }}</strong></p>
        
        <div class="section">
          <h3>Resumo do Pedido</h3>
          <table class="striped">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of order.items">
                <td>{{ item.product.name }}</td>
                <td>{{ item.quantity }}</td>
                <td>R$ {{ item.subtotal | number:'1.2-2' }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2"><strong>Total</strong></td>
                <td><strong>R$ {{ order.total | number:'1.2-2' }}</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div class="section">
          <h3>Informações de Entrega</h3>
          <p>
            <strong>Nome:</strong> {{ order.customerName }}<br>
            <strong>Email:</strong> {{ order.customerEmail }}<br>
            <strong>Endereço:</strong> 
            {{ order.shippingAddress.street }}, 
            {{ order.shippingAddress.city }} - 
            {{ order.shippingAddress.state }} 
            {{ order.shippingAddress.zipCode }}
          </p>
          <p>
            <strong>Método de Pagamento:</strong> 
            {{ getPaymentMethodLabel(order.paymentMethod) }}
          </p>
        </div>

        <div class="section center-align">
          <a 
            routerLink="/home" 
            class="btn blue waves-effect waves-light"
          >
            Continuar Comprando
            <i class="material-icons right">shopping_cart</i>
          </a>
        </div>
      </div>

      <div *ngIf="!order" class="card-panel red lighten-4">
        <p class="red-text text-darken-2">Pedido não encontrado</p>
        <a 
          routerLink="/home" 
          class="btn blue waves-effect waves-light"
        >
          Voltar para a Página Inicial
        </a>
      </div>
    </div>
  `,
  styles: [`
    .order-confirmation {
      margin-top: 20px;
    }
    .section {
      margin-bottom: 20px;
    }
  `]
})
export class OrderConfirmationComponent implements OnInit {
  order: Order | null = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.orderService.getAllOrders().subscribe(orders => {
      this.order = orders.find(o => o.id === orderId) || null;
    });
  }

  getPaymentMethodLabel(method: string): string {
    const labels: { [key: string]: string } = {
      'credit_card': 'Cartão de Crédito',
      'pix': 'PIX',
      'boleto': 'Boleto Bancário'
    };
    return labels[method] || method;
  }
}
