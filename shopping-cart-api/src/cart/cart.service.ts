import { Injectable, BadRequestException } from '@nestjs/common';
import { CartItem, Product } from '../interfaces/product.interface';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartService {
  private cart: CartItem[] = [];

  constructor(private readonly productsService: ProductsService) {}

  addToCart(productId: number): CartItem {
    const product = this.productsService.findById(productId);

    if (!product) {
      throw new BadRequestException(`Product with ID ${productId} not found`);
    }

    const existingItem = this.cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
      return existingItem;
    } else {
      const newCartItem: CartItem = {
        ...product,
        quantity: 1,
      };
      this.cart.push(newCartItem);
      return newCartItem;
    }
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  getTotalPrice(): number {
    return this.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }

  clearCart(): void {
    this.cart = [];
  }
}
