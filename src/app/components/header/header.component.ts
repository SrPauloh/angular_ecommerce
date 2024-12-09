import { Component, AfterViewInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar.component';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule, CartSidebarComponent],
  template: `
    <nav class="blue darken-3">
      <div class="nav-wrapper container">
        <a routerLink="/" class="brand-logo">Game Mania</a>
        
        <!-- Mobile menu trigger -->
        <a href="#" data-target="mobile-nav" class="sidenav-trigger right">
          <i class="material-icons">menu</i>
        </a>
        
        <!-- Desktop navigation -->
        <ul class="right hide-on-med-and-down">
          <li><a routerLink="/">Início</a></li>
          <li><a routerLink="/products">Produtos</a></li>
          <li>
            <a (click)="toggleCartSidebar()">
              Carrinho ({{ getCartItemCount() }})
            </a>
          </li>
          <li>
            <a routerLink="/checkout">
              Finalizar Compra
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Mobile navigation -->
    <ul class="sidenav" id="mobile-nav">
      <li class="logo-mobile">
        <a routerLink="/" class="center-align">
          <span>Game Mania</span>
        </a>
      </li>
      <li><a routerLink="/">Início</a></li>
      <li><a routerLink="/products">Produtos</a></li>
      <li>
        <a (click)="toggleCartSidebar(); closeMobileSidenav()">
          Carrinho ({{ getCartItemCount() }})
        </a>
      </li>
      <li>
        <a routerLink="/checkout" class="sidenav-close">
          Finalizar Compra
        </a>
      </li>
    </ul>

    <app-cart-sidebar 
      [isOpen]="isCartSidebarOpen"
      (closeSidebar)="closeCartSidebar()">
    </app-cart-sidebar>
  `,
  styles: [`
    /* Mobile Sidenav Styles */
    @media only screen and (max-width: 992px) {
      .sidenav-trigger {
        display: block !important;
      }
    }

    .logo-mobile {
      padding: 15px 0;
      background-color: #1565c0;
      text-align: center;
    }

    .logo-mobile a {
      color: white !important;
      font-size: 1.5rem;
      font-weight: bold;
    }

    .sidenav li > a {
      color: rgba(0,0,0,0.87) !important;
    }
  `]
})
export class HeaderComponent implements AfterViewInit {
  isCartSidebarOpen = false;

  constructor(private cartService: CartService) {}

  toggleCartSidebar() {
    this.isCartSidebarOpen = !this.isCartSidebarOpen;
  }

  getCartItemCount(): number {
    return this.cartService.getCartItems().getValue().length;
  }

  closeCartSidebar() {
    this.isCartSidebarOpen = false;
  }

  // Method to close mobile sidenav when cart is opened
  closeMobileSidenav() {
    const elem = document.getElementById('mobile-nav');
    if (elem) {
      const instance = M.Sidenav.getInstance(elem);
      if (instance) {
        instance.close();
      }
    }
  }

  // Initialize Materialize Sidenav after view init
  ngAfterViewInit() {
    const elems = document.querySelectorAll('.sidenav');
    if (elems.length > 0) {
      M.Sidenav.init(elems);
    }
  }
}