'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import { useCartStore } from "../../../store/cart-store";

export default function SuccessPage() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart])

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment successful!</h1>
      <p className="mb-4">Thank you for your purchase. Your order is being processed.</p>

      <Button asChild variant="link" className="underline hover:text-blue-400">
        <Link href="/products">Continue shopping</Link>
      </Button>
    </div>
  );
}