export interface Product {
    id: number;
    name: string;
    price: number;
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }
  
  export interface CartResponse {
    items: CartItem[];
    total: number;
  }
  
  export interface BestCombinationResult {
    products: Product[];
    total: number;
  }