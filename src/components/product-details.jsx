'use client';

import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "../../store/cart-store";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ProductDetails({ product, previousProductId, nextProductId }) {
  const { items, addItem, removeItem, removeAllItem } = useCartStore();
  const price = product.default_price;
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center">
      <Link href="/products" className="flex font-semibold md:mt-20 mt-16 top-4 left-4 absolute">
        <ArrowLeftIcon className="h-6 w-6 mr-2"/>
        Back
      </Link>
      {product.images && product.images[0] && (
        <div className="relative h-96 w-full md:w-1/2 rounded-lg overflow-visible">
          <Image
          alt={product.name} 
          src={product.images[0]}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
          />
        </div>
      )}
      <div className="md:w-1/2">
        <h1 className="flex items-center gap-8 text-3xl font-bold mb-4">
          <Link href={`/products/${previousProductId}`}>
            <ArrowLeft className="h-6 w-6"/>
          </Link>
          {product.name}
          <Link href={`/products/${nextProductId}`}>
            <ArrowRight className="h-6 w-6"/>
          </Link>
        </h1>
        {product.description && (
          <p className="text-gray-700 mb-4">
            {product.description}
          </p>
        )}
        {price && price.unit_amount && (
          <p className="text-lg font-semibold text-gray-900">
            ${(price.unit_amount / 100).toFixed(2)}
          </p>
        )}
        {cartItem && cartItem.quantity > 0 && <p className="font-bold">*In cart</p>}
        <p className="my-4 text-gray-700">Add to/Remove from cart:</p>
        <div className="flex items-center space-x-4">
          <Button
          className="bg-neutral-200" variant="outline"
          onClick={() => removeItem(product.id)}
          >
            -
          </Button>
          <span className="text-lg font-semibold">{quantity}</span>
          <Button onClick={onAddItem}>+</Button>
          {quantity > 0 && (
            <Button
            variant="outline"
            className="bg-red-100 hover:bg-red-200"
            onClick={() => removeAllItem(product.id)}
            >
              <XMarkIcon/> Remove this item from the cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}