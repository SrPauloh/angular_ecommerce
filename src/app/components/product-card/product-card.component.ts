import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="product-card">
      <div class="card hoverable">
        <div class="card-image">
          <img 
            [src]="product.imageUrl" 
            [alt]="product.name"
            (error)="onImageError($event)"
          >
          <div class="card-action-buttons">
            <a 
              class="btn-floating halfway-fab waves-effect waves-light blue tooltipped" 
              (click)="goToProductDetail()"
              data-tooltip="Ver Detalhes"
            >
              <i class="material-icons">info</i>
            </a>
            <a 
              class="btn-floating halfway-fab waves-effect waves-light green tooltipped" 
              (click)="addToCart()"
              data-tooltip="Adicionar ao Carrinho"
              style="margin-right: 50px;"
            >
              <i class="material-icons">add_shopping_cart</i>
            </a>
          </div>
          <span 
            *ngIf="product.isNew" 
            class="new-badge badge blue"
          >
            NOVO
          </span>
        </div>
        <div class="card-content">
          <span class="card-title truncate">{{ product.name }}</span>
          <p class="product-price">
            R$ {{ product.price | number:'1.2-2' }}
          </p>
          <div class="product-rating" *ngIf="product.rating !== undefined">
            <i class="material-icons">star</i>
            {{ product.rating.toFixed(1) }}/5
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() productDetailClick = new EventEmitter<number>();
  @Output() addToCartClick = new EventEmitter<Product>();

  constructor(
    private router: Router
  ) {}

  goToProductDetail() {
    this.productDetailClick.emit(this.product.id);
  }

  addToCart() {
    this.addToCartClick.emit(this.product);
  }

  onImageError(event: any) {
    event.target.src = 'https://placehold.co/400x400?text=Produto+Indisponível';
  }
}
