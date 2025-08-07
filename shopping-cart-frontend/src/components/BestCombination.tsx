import { useState } from 'react';
import { Product, BestCombinationResult } from '@/types';

interface BestCombinationProps {
  products: Product[];
}

// Algoritmo inteligente de optimización para compras con presupuesto limitado
function findBestCombination(products: Product[], budget: number): BestCombinationResult {
  const n = products.length;
  
  // Tabla de programación dinámica para optimización
  const dp: number[][] = Array(n + 1).fill(null).map(() => Array(budget + 1).fill(0));
  
  // Construir la tabla de optimización
  for (let i = 1; i <= n; i++) {
    const currentProduct = products[i - 1];
    for (let w = 0; w <= budget; w++) {
      // Opción 1: No incluir el producto actual
      dp[i][w] = dp[i - 1][w];
      
      // Opción 2: Incluir el producto actual si el presupuesto lo permite
      if (currentProduct.price <= w) {
        const valueWithCurrent = dp[i - 1][w - currentProduct.price] + currentProduct.price;
        dp[i][w] = Math.max(dp[i][w], valueWithCurrent);
      }
    }
  }
  
  // Reconstruir la solución óptima
  const selectedProducts: Product[] = [];
  let w = budget;
  
  for (let i = n; i > 0 && w > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      const currentProduct = products[i - 1];
      selectedProducts.push(currentProduct);
      w -= currentProduct.price;
    }
  }
  
  const total = selectedProducts.reduce((sum, product) => sum + product.price, 0);
  
  return {
    products: selectedProducts,
    total
  };
}

export default function BestCombination({ products }: BestCombinationProps) {
  const [budget, setBudget] = useState<number>(150);
  const [result, setResult] = useState<BestCombinationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Dataset premium para análisis de optimización
  const optimizationProducts: Product[] = [
    { id: 1, name: 'Artículo Premium A', price: 60 },
    { id: 2, name: 'Artículo Premium B', price: 100 },
    { id: 3, name: 'Artículo Premium C', price: 120 },
    { id: 4, name: 'Artículo Premium D', price: 70 }
  ];

  const handleOptimize = async () => {
    setIsCalculating(true);
    
    // Simular tiempo de procesamiento para sensación profesional
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const optimization = findBestCombination(optimizationProducts, budget);
    setResult(optimization);
    setIsCalculating(false);
  };

  const efficiency = result ? ((result.total / budget) * 100) : 0;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Optimizador Inteligente</h2>
          <p className="text-xs text-gray-600">Maximiza el valor dentro de tu presupuesto</p>
        </div>
      </div>
      
      <div className="mb-5">
        <div className="grid grid-cols-2 gap-2 mb-4">
          {optimizationProducts.map((product) => (
            <div key={product.id} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg p-3">
              <div className="text-xs font-medium text-gray-800 mb-1">{product.name}</div>
              <div className="text-base font-bold text-purple-600">${product.price}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-5">
        <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2">
          Presupuesto Disponible ($)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">$</span>
          </div>
          <input
            type="number"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="block w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg font-semibold focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
            min="0"
            placeholder="Ingresa tu presupuesto"
          />
        </div>
      </div>
      
      <button
        onClick={handleOptimize}
        disabled={isCalculating}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-5"
      >
        {isCalculating ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Optimizando...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Encontrar Combinación Óptima
          </>
        )}
      </button>
      
      {result && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="font-bold text-purple-800">Resultados de Optimización</h3>
          </div>
          
          {result.products.length === 0 ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-yellow-700 font-medium text-sm">Presupuesto insuficiente</p>
              <p className="text-yellow-600 text-xs mt-1">Intenta aumentar tu presupuesto</p>
            </div>
          ) : (
            <>
              <div className="space-y-2 mb-4">
                {result.products.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-lg p-3 border border-purple-200 shadow-sm"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800 text-sm">{product.name}</span>
                      <span className="text-purple-600 font-bold">${product.price}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white rounded-lg p-3 text-center border border-purple-200">
                  <div className="text-xl font-bold text-purple-600">${result.total}</div>
                  <div className="text-xs text-gray-600">Inversión Total</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center border border-purple-200">
                  <div className="text-xl font-bold text-emerald-600">{efficiency.toFixed(1)}%</div>
                  <div className="text-xs text-gray-600">Eficiencia</div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-600">Utilización del Presupuesto</span>
                  <span className="text-xs font-medium text-gray-800">${result.total} / ${budget}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(efficiency, 100)}%` }}
                  ></div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}