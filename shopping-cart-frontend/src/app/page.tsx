'use client';

import { useState, useEffect } from 'react';
import ProductList from '@/components/ProductList';
import Cart from '@/components/Cart';
import BestCombination from '@/components/BestCombination';
import { productsApi, cartApi } from '@/services/api';
import { Product, CartItem } from '@/types';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar productos al montar el componente
  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const productsData = await productsApi.getAll();
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading products:', error);
      setError('Error al cargar productos. Asegúrate de que el backend esté ejecutándose en el puerto 3001.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadCart = async () => {
    try {
      const cartData = await cartApi.getCart();
      setCartItems(cartData.items);
      setCartTotal(cartData.total);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const handleAddToCart = async (productId: number) => {
    try {
      await cartApi.addToCart(productId);
      await loadCart(); // Recargar el carrito después de agregar
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error al agregar producto al carrito');
    }
  };

  const handleClearCart = async () => {
    try {
      await cartApi.clearCart();
      await loadCart(); // Recargar el carrito después de limpiar
    } catch (error) {
      console.error('Error clearing cart:', error);
      alert('Error al limpiar el carrito');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error de Conexión</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              loadProducts();
              loadCart();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl mb-3 shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Smart Commerce
          </h1>
          <p className="text-lg text-gray-600 font-medium">Soluciones Inteligentes de Compras</p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-3 rounded-full"></div>
        </header>

        {/* Main content */}
        <div className="grid gap-6 xl:grid-cols-3">
          {/* Left column - Products */}
          <div className="xl:col-span-1">
            <ProductList 
              products={products} 
              onAddToCart={handleAddToCart}
              isLoading={isLoading}
            />
          </div>

          {/* Middle column - Smart Optimizer */}
          <div className="xl:col-span-1">
            <BestCombination products={products} />
          </div>

          {/* Right column - Cart */}
          <div className="xl:col-span-1">
            <Cart 
              items={cartItems} 
              total={cartTotal} 
              onClearCart={handleClearCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}