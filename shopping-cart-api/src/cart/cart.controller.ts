import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from '../dto/add-to-cart.dto';
import type { CartItem } from '../interfaces/product.interface';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addToCart(@Body() addToCartDto: AddToCartDto): CartItem {
    return this.cartService.addToCart(addToCartDto.productId);
  }

  @Get()
  getCart() {
    return {
      items: this.cartService.getCart(),
      total: this.cartService.getTotalPrice(),
    };
  }

  @Delete()
  clearCart() {
    this.cartService.clearCart();
    return { message: 'Cart cleared successfully' };
  }
}
