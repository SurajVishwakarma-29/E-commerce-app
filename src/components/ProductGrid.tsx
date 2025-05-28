'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

export default function ProductGrid({
  onAdd,
  category,
}: {
  onAdd: (product: Product) => void;
  category: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const query =
        category === 'all'
          ? supabase.from('products').select('*')
          : supabase.from('products').select('*').eq('category', category);

      const { data, error } = await query;

      if (error) console.error(error);
      else setProducts(data || []);
    }

    fetchProducts();
  }, [category]);

  return (
    <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
}
