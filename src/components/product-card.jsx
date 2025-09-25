'use client';

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "../../store/cart-store";

export default function ProductCard({ product }) {
  const  { items } = useCartStore();
  const cartItem = items.find((item) => item.id === product.id);
  const itemInCart = cartItem && cartItem.quantity > 0 ? true : false;
  const price = product.default_price;
  
  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <Card className="group hover:shadow-2xl transition duration-300 py-0 h-full flex flex-col gap-0 border-gray-400">
        {product.images && product.images[0] && (
          <div className="relative h-60 w-full">
            <Image
            alt={product.name} 
            src={product.images[0]} 
            layout="fill" 
            objectFit="cover"
            className="group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg"
            />
          </div>
        )}
        <CardHeader className="p-4">
          <CardTitle className="text-xl font-bold text-gray-800">{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col justify-between">
          {product.description && (
            <p className="text-gray-600 text-sm mb-2">
              {product.description}
            </p>
          )}
          {price && price.unit_amount && (
            <p className="text-lg font-semibold text-gray-900">
              ${(price.unit_amount / 100).toFixed(2)}
            </p>
          )}
          {itemInCart && <p className="font-bold">*In cart</p>}
          <Button className="mt-4">View item</Button>
        </CardContent>
      </Card>
    </Link>
  );
}