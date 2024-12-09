import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Produtos</h2>
      <div class="row">
        <div class="col s12 m6 l4" *ngFor="let product of products">
          <div class="card hoverable">
            <div class="card-image">
              <img [src]="product.imageUrl" [alt]="product.name">
              <span class="card-title">{{ product.name }}</span>
            </div>
            <div class="card-content">
              <p>{{ product.description }}</p>
              <p class="price">{{ product.price | currency:'BRL' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    .card {
      margin: 15px 0;
    }
    .price {
      font-weight: bold;
      color: #1976d2;
    }
  `]
})
export class ProductsComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'PlayStation 5',
      description: 'Console PlayStation 5 com controle DualSense',
      price: 3999.99,
      imageUrl: 'assets/products/ps5.jpg'
    },
    {
      id: 2,
      name: 'Xbox Series X',
      description: 'Console Xbox Series X com controle sem fio',
      price: 3799.99,
      imageUrl: 'assets/products/xbox.jpg'
    },
    {
      id: 3,
      name: 'Nintendo Switch OLED',
      description: 'Console Nintendo Switch modelo OLED com Joy-Cons',
      price: 2499.99,
      imageUrl: 'assets/products/switch.jpg'
    }
  ];
}
