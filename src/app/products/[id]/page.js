import ProductDetails from "@/components/product-details";
import { stripe } from "@/lib/stripe";

export default async function ProductPage(props) {
  const params = await props.params;
  const product = await stripe.products.retrieve(params.id, {
    expand: ["default_price"],
  });

  const serializedProduct = {
    id: product.id,
    name: product.name,
    description: product.description,
    images: product.images || null,
    default_price: product.default_price
  }
  return (
    <ProductDetails product={serializedProduct} />
  );
}