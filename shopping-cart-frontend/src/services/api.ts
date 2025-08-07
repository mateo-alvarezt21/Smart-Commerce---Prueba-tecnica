import axios from 'axios';
import { Product, CartResponse, CartItem } from '@/types';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products');
    return response.data;
  },
};

export const cartApi = {
  getCart: async (): Promise<CartResponse> => {
    const response = await api.get<CartResponse>('/cart');
    return response.data;
  },
  
  addToCart: async (productId: number): Promise<CartItem> => {
    const response = await api.post<CartItem>('/cart', { productId });
    return response.data;
  },
  
  clearCart: async (): Promise<void> => {
    await api.delete('/cart');
  },
};