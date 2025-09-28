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
    <div>
      <h1>Payment successful!</h1>
      <p>Thank you for your purchase. Your order is being processed.</p>

      <Button asChild>
        <Link href="/products">Continue shopping</Link>
      </Button>
    </div>
  );
}