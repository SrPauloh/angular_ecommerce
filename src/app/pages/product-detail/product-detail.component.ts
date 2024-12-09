import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container" *ngIf="product">
      <div class="row">
        <div class="col s12 m6">
          <div class="product-gallery">
            <img 
              [src]="currentImage" 
              class="responsive-img materialboxed"
              alt="{{ product.name }}"
            >
            <div class="product-thumbnails">
              <img 
                *ngFor="let image of product.images" 
                [src]="image" 
                (click)="changeImage(image)"
                class="thumbnail"
              >
            </div>
          </div>
        </div>
        <div class="col s12 m6">
          <h1>{{ product.name }}</h1>
          <p class="product-description">{{ product.longDescription }}</p>
          
          <div class="product-price">
            <h3>R$ {{ product.price | number:'1.2-2' }}</h3>
          </div>
          
          <div class="product-rating" *ngIf="product.rating">
            <i class="material-icons">star</i>
            {{ product.rating.toFixed(1) }}/5
          </div>
          
          <div class="product-variants" *ngIf="product.variants?.length">
            <h5>Variantes</h5>
            <div class="variant-selector">
              <select class="browser-default">
                <option 
                  *ngFor="let variant of product.variants" 
                  [value]="variant.color"
                >
                  {{ variant.color }}
                  {{ variant.additionalPrice ? '(+R$ ' + variant.additionalPrice + ')' : '' }}
                </option>
              </select>
            </div>
          </div>
          
          <div class="product-specifications" *ngIf="product.specifications">
            <h5>Especificações</h5>
            <table>
              <tbody>
                <tr *ngFor="let spec of objectKeys(product.specifications)">
                  <td>{{ spec }}</td>
                  <td>{{ product.specifications[spec] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="product-actions">
            <button 
              class="btn waves-effect waves-light green" 
              (click)="addToCart()"
            >
              Adicionar ao Carrinho
              <i class="material-icons right">add_shopping_cart</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-gallery img {
      max-height: 500px;
      object-fit: contain;
    }
    .product-thumbnails {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }
    .thumbnail {
      width: 60px;
      height: 60px;
      object-fit: cover;
      margin: 0 5px;
      cursor: pointer;
      border: 2px solid transparent;
      transition: border-color 0.3s;
    }
    .thumbnail:hover {
      border-color: #2196F3;
    }
    .product-price h3 {
      color: #4CAF50;
      font-weight: bold;
    }
    .product-rating {
      display: flex;
      align-items: center;
      color: #FFC107;
      margin: 10px 0;
    }
    .product-rating i {
      margin-right: 5px;
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  currentImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const productId = Number(params.get('id'));
      this.productService.getProductById(productId).subscribe(product => {
        this.product = product;
        if (product && product.images && product.images.length > 0) {
          this.currentImage = product.images[0];
        }
      });
    });
  }

  changeImage(image: string) {
    this.currentImage = image;
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
