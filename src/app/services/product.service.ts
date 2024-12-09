import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, ProductVariant } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([
    {
      id: 1,
      name: 'Console PlayStation 5',
      description: 'Último modelo de console da Sony',
      longDescription: `O PlayStation 5 é o console de última geração da Sony, oferecendo 
        gráficos incríveis, tempos de carregamento ultra-rápidos e uma experiência 
        de jogo imersiva com o controle DualSense.`,
      price: 4500.00,
      imageUrl: 'assets/products/ps5.jpg',
      images: [
        'assets/products/ps5.jpg',
        'assets/products/ps5-2.jpg',
        'assets/products/ps5-3.jpg'
      ],
      featured: true,
      isNew: true,
      rating: 4.7,
      category: 'Consoles',
      stock: 50,
      variants: [
        { color: 'Branco', additionalPrice: 0 },
        { color: 'Preto', additionalPrice: 100 }
      ],
      specifications: {
        'Armazenamento': '825GB SSD',
        'Resolução': '4K',
        'Taxa de Quadros': 'Até 120 FPS',
        'Conectividade': 'Wi-Fi 6, Bluetooth 5.1'
      }
    },
    {
      id: 2,
      name: 'Nintendo Switch OLED',
      description: 'Versão mais recente do Nintendo Switch',
      longDescription: `O Nintendo Switch OLED oferece uma tela OLED vibrante de 7 polegadas, 
        áudio aprimorado e um design elegante, proporcionando uma experiência de jogo 
        portátil e de mesa incomparável.`,
      price: 2800.00,
      imageUrl: 'assets/products/switch.jpg',
      images: [
        'assets/products/switch.jpg',
        'assets/products/switch-2.jpg',
        'assets/products/switch-3.jpg'
      ],
      featured: true,
      isNew: false,
      rating: 4.5,
      category: 'Consoles',
      stock: 30,
      variants: [
        { color: 'Branco', additionalPrice: 0 },
        { color: 'Neon', additionalPrice: 50 }
      ],
      specifications: {
        'Tela': 'OLED 7 polegadas',
        'Armazenamento': '64GB',
        'Modo de Jogo': 'Portátil e Dock',
        'Bateria': 'Até 9 horas'
      }
    },
    {
      id: 3,
      name: 'Xbox Series X',
      description: 'Console de última geração da Microsoft',
      longDescription: `O Xbox Series X é o console mais poderoso da Microsoft, oferecendo 
        gráficos 4K, ray tracing e carregamentos instantâneos com o novo SSD de alta velocidade.`,
      price: 4200.00,
      imageUrl: 'assets/products/xbox.jpg',
      images: [
        'assets/products/xbox.jpg',
        'assets/products/xbox-2.jpg',
        'assets/products/xbox-3.jpg'
      ],
      featured: true,
      isNew: true,
      rating: 4.6,
      category: 'Consoles',
      stock: 40,
      variants: [
        { color: 'Preto', additionalPrice: 0 }
      ],
      specifications: {
        'Armazenamento': '1TB SSD',
        'Resolução': '4K',
        'Taxa de Quadros': 'Até 120 FPS',
        'Conectividade': 'Wi-Fi 6, Bluetooth'
      }
    }
  ]);

  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  getFeaturedProducts(): Observable<Product[]> {
    return new BehaviorSubject(
      this.productsSubject.getValue().filter(product => product.featured)
    ).asObservable();
  }

  getProductById(id: number): Observable<Product | undefined> {
    return new BehaviorSubject(
      this.productsSubject.getValue().find(product => product.id === id)
    ).asObservable();
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return new BehaviorSubject(
      this.productsSubject.getValue().filter(product => product.category === category)
    ).asObservable();
  }
}
