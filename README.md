# Smart Commerce - Soluciones Inteligentes de Compras

Una plataforma avanzada de e-commerce que combina un carrito de compras funcional con un optimizador inteligente de presupuesto, desarrollada con tecnologías modernas de full-stack.

## 🌐 Demo en Vivo

- **🚀 Aplicación**: [https://smart-commerce-prueba-tecnica.vercel.app](https://smart-commerce-prueba-tecnica.vercel.app)
- **⚙️ Backend API**: [https://smart-commerce-prueba-tecnica-production.up.railway.app](https://smart-commerce-prueba-tecnica-production.up.railway.app)
- **📂 Repositorio**: [https://github.com/tu-usuario/Smart-Commerce---Prueba-tecnica](https://github.com/tu-usuario/Smart-Commerce---Prueba-tecnica)

### 🧪 Probar la API
- **Productos**: [/products](https://smart-commerce-prueba-tecnica-production.up.railway.app/products)
- **Carrito**: [/cart](https://smart-commerce-prueba-tecnica-production.up.railway.app/cart)

## 🚀 Características Principales

- **Catálogo de Productos**: Interfaz intuitiva para explorar y agregar productos al carrito
- **Carrito de Compras Inteligente**: Gestión completa de productos con cantidad y totales automáticos
- **Optimizador de Presupuesto**: Algoritmo avanzado que encuentra la mejor combinación de productos dentro de un presupuesto específico
- **Diseño Responsive**: Interfaz moderna y profesional que funciona en todos los dispositivos
- **API RESTful**: Backend robusto con endpoints bien estructurados

## 🛠️ Stack Tecnológico

### Backend
- **NestJS**: Framework Node.js para APIs escalables
- **TypeScript**: Tipado estático para mayor robustez
- **Class Validator**: Validación de datos de entrada

### Frontend
- **Next.js 14**: Framework React con App Router
- **TypeScript**: Desarrollo type-safe
- **Tailwind CSS**: Diseño moderno y responsive
- **Axios**: Cliente HTTP para comunicación con la API

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** (viene incluido con Node.js)
- **Git** (para clonar el repositorio)

## 🔧 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd smart-commerce
```

### 2. Configurar el Backend

```bash
# Navegar al directorio del backend
cd shopping-cart-api

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run start:dev
```

El backend estará disponible en: `http://localhost:3001`

### 3. Configurar el Frontend

En una nueva terminal:

```bash
# Navegar al directorio del frontend
cd shopping-cart-frontend

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:3000`

## 🎯 Uso de la Aplicación

### Catálogo de Productos
- Explora los productos disponibles en el panel izquierdo
- Haz clic en "Agregar" para añadir productos a tu carrito
- Cada producto muestra su precio claramente

### Carrito de Compras
- Visualiza todos tus productos seleccionados en el panel derecho
- Ve el total actualizado automáticamente
- Usa "Limpiar" para vaciar el carrito completamente

### Optimizador Inteligente
- Ingresa tu presupuesto disponible en el panel central
- Haz clic en "Encontrar Combinación Óptima"
- El algoritmo calculará la mejor combinación de productos que maximice el valor sin exceder tu presupuesto
- Ve métricas de eficiencia y utilización del presupuesto

## 🔌 API Endpoints

### Productos
- `GET /products` - Obtener lista de todos los productos

### Carrito
- `GET /cart` - Obtener contenido actual del carrito
- `POST /cart` - Agregar producto al carrito
  ```json
  {
    "productId": 1
  }
  ```
- `DELETE /cart` - Limpiar el carrito completamente

## 🧠 Algoritmo de Optimización

El optimizador utiliza **programación dinámica** para resolver el problema de la mochila (knapsack problem):

### Funcionamiento
1. **Entrada**: Lista de productos y presupuesto máximo
2. **Proceso**: Algoritmo de programación dinámica que evalúa todas las combinaciones posibles
3. **Salida**: Combinación óptima que maximiza el valor total sin exceder el presupuesto

### Complejidad
- **Tiempo**: O(n × presupuesto)
- **Espacio**: O(n × presupuesto)

Donde `n` es el número de productos disponibles.

## 📁 Estructura del Proyecto

```
smart-commerce/
├── shopping-cart-api/          # Backend (NestJS)
│   ├── src/
│   │   ├── products/           # Módulo de productos
│   │   ├── cart/              # Módulo de carrito
│   │   ├── interfaces/        # Interfaces TypeScript
│   │   └── dto/               # Data Transfer Objects
│   └── package.json
│
├── shopping-cart-frontend/     # Frontend (Next.js)
│   ├── src/
│   │   ├── app/               # App Router de Next.js
│   │   ├── components/        # Componentes React
│   │   ├── services/          # Servicios API
│   │   └── types/             # Tipos TypeScript
│   └── package.json
│
└── README.md
```

## 🔄 Scripts Disponibles

### Backend
```bash
npm run start:dev    # Desarrollo con hot reload
npm run start        # Producción
npm run build        # Compilar TypeScript
```

### Frontend
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter ESLint
```
---
