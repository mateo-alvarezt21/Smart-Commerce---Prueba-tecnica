import { CartItem } from '@/types';

interface CartProps {
  items: CartItem[];
  total: number;
  onClearCart: () => void;
}

export default function Cart({ items, total, onClearCart }: CartProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sticky top-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Carrito de Compras</h2>
            <p className="text-xs text-gray-500">{items.length} artículo{items.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        {items.length > 0 && (
          <button
            onClick={onClearCart}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-md hover:shadow-lg transition-all duration-300"
          >
            Limpiar
          </button>
        )}
      </div>
      
      {items.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium text-sm">Tu carrito está vacío</p>
          <p className="text-xs text-gray-400 mt-1">Agrega productos para comenzar</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-6 max-h-80 overflow-y-auto">
            {items.map((item, index) => (
              <div 
                key={item.id} 
                className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 text-sm mb-1">{item.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                        ${item.price} c/u
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-medium">
                        Cant: {item.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-emerald-600">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">Total</span>
                <span className="text-2xl font-bold text-emerald-600">${total}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-600 mb-4">
                <span>Artículos en carrito</span>
                <span>{items.reduce((sum, item) => sum + item.quantity, 0)} productos</span>
              </div>
              
              <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Proceder al Pago
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}