import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule, 
    FormsModule, 
    CommonModule,
    ProductCardComponent
  ],
  template: `
    <div class="container">
      <!-- Banner -->
      <div class="banner">
        <div class="hero-section">
          <h1>Bem-vindo à Game Mania</h1>
          <p class="subtitle">Descubra os melhores jogos e acessórios pelos melhores preços</p>
          <a href="#featured" class="btn waves-effect waves-light">Comprar Agora</a>
        </div>
      </div>

      <!-- Featured Products -->
      <section id="featured" class="section">
        <h1>Produtos em Destaque</h1>
        <div class="row">
          <div 
            *ngFor="let product of featuredProducts" 
            class="col s12 m4"
          >
            <app-product-card 
              [product]="product"
              (productDetailClick)="goToProductDetail($event)"
              (addToCartClick)="addToCart($event)"
            ></app-product-card>
          </div>
        </div>
      </section>

      <!-- Contact Form -->
      <section class="section contact-section">
        <h2 class="section-title">Fale Conosco</h2>
        <div class="row">
          <form class="col s12 m8 offset-m2" (ngSubmit)="onSubmit()">
            <div class="row">
              <div class="input-field col s12 m6">
                <i class="material-icons prefix">person</i>
                <input id="name" type="text" [(ngModel)]="contactForm.name" name="name" class="validate">
                <label for="name">Nome</label>
              </div>
              <div class="input-field col s12 m6">
                <i class="material-icons prefix">email</i>
                <input id="email" type="email" [(ngModel)]="contactForm.email" name="email" class="validate">
                <label for="email">E-mail</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">message</i>
                <textarea id="message" class="materialize-textarea" 
                         [(ngModel)]="contactForm.message" name="message"></textarea>
                <label for="message">Mensagem</label>
              </div>
            </div>
            <div class="center-align">
              <button class="btn-large waves-effect waves-light blue" type="submit">
                Enviar Mensagem
                <i class="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .hero-section {
      text-align: center;
      padding: 60px 20px;
      background: linear-gradient(135deg, #1976d2, #64b5f6);
      color: white;
      border-radius: 8px;
      margin-bottom: 40px;
    }
    .hero-section h1 {
      font-size: 3em;
      margin-bottom: 20px;
    }
    .subtitle {
      font-size: 1.5em;
      margin-bottom: 30px;
    }
    .section-title {
      text-align: center;
      color: #1976d2;
      margin-bottom: 40px;
      font-size: 2.5em;
    }
    .contact-section {
      background: #f5f5f5;
      padding: 40px;
      border-radius: 8px;
      margin-top: 40px;
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];

  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  constructor(
    private productService: ProductService,
    private cartService: CartService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getFeaturedProducts().subscribe(
      products => this.featuredProducts = products
    );
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  goToProductDetail(productId: number) {
    this.router.navigate(['/product', productId.toString()]);
  }

  onSubmit() {
    console.log('Formulário enviado:', this.contactForm);
    // Reset form after submission
    this.contactForm = {
      name: '',
      email: '',
      message: ''
    };
  }
}