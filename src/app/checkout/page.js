'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "../../../store/cart-store";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const { items, addItem, removeItem, clearCart } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (total === 0 || items.length === 0) {
    return (
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto ">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {items.map((item, key) => (
              <li key={key} className="flex flex-col gap-2 border-b pb-2">
                <div className="flex justify-between">
                  <span className="font-medium">{item.name}</span>
                  <span className="font-semibold">
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                  variant="outline" size="sm"
                  onClick={() => removeItem(item.id)}
                  >
                    -
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button
                  variant="outline" size="sm"
                  onClick={() => addItem({...item, quantity: 1})}
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-2 text-lg font-semibold">
            Total: ${(total / 100).toFixed(2)}
          </div>
        </CardContent>
      </Card>
      <form className="flex justify-center max-w-md mx-auto gap-8">
        <Button
        type="submit" 
        variant="outline"
        className="bg-blue-400 hover:bg-blue-500 w-1/3"
        >
          Proceed to payement
        </Button>
        <Button
        onClick={()=> clearCart()}
        variant="outline"
        className="bg-red-400 hover:bg-red-500 text-black w-1/3"
        >
          Clear cart
        </Button>
      </form>
    </div>
  );
}