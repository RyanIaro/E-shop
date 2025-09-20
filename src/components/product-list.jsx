'use client';

import { useState } from "react";
import ProductCard from "./product-card";

export default function ProductsList({ products }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    const nameMatches = product.name.toLowerCase().includes(term);
    const descriptionMatches = product.description
      ? product.description.toLowerCase().includes(term)
    : false;
    return nameMatches || descriptionMatches;
  })
  
  return (
    <div>
      <div className="mb-6 flex justify-center">
        <input
        type="text"
        placeholder="Search products"
        className="w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
        />
      </div>
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product, key) => {
          return (
            <li key={key}>
              <ProductCard product={product} />
            </li>
          )
        })}
      </ul>
    </div>
  );
}