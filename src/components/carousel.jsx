'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import Image from "next/image";

export default function Carousel({ products }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev +1) % products.length)
    }, 3000)

    return () => clearInterval(interval);
  }, [products.length])

  const currentProduct = products[current];
  const price = currentProduct.default_price;
  
  return (
    <Card className="relative overflow-hidden rounded-lg shadow-md border-gray-300">
      {currentProduct.images && currentProduct.images[0] && (
        <div className="relative h-80 w-full">
          <Image
          alt={currentProduct.name} 
          src={currentProduct.images[0]} 
          layout="fill" 
          objectFit="cover"
          className="transition-opacity duration-500 ease-in-out"
          />
        </div>
      )}
      <CardContent className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/25">
          <CardTitle className="text-3xl font-bold mb-2">
            {currentProduct.name}
          </CardTitle>
          {price && price.unit_amount && (
            <p className="text-xl">
              ${(price.unit_amount/100).toFixed(2)}
            </p>
          )}
      </CardContent>
    </Card>
  );
}