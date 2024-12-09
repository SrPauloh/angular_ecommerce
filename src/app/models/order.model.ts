import { Product } from './product.model';

export interface OrderItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id?: number;
  items: OrderItem[];
  total: number;
  customerName: string;
  customerEmail: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: 'credit_card' | 'pix' | 'boleto';
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
}
