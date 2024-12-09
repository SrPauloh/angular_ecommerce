import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Shopping Cart</h2>
      <!-- Add your cart content here -->
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
  `]
})
export class CartComponent {
}
