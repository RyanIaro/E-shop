import ProductDetails from "@/components/product-details";
import { stripe } from "@/lib/stripe";

export default async function ProductPage(props) {
  const params = await props.params;
  const product = await stripe.products.retrieve(params.id, {
    expand: ["default_price"],
  });
  const productList = await stripe.products.list().then((list) => list.data);
  const index = productList.findIndex((p) => p.id === product.id);
  const nextProductId = index < productList.length - 1 ? productList[index + 1].id : productList[0].id;
  const previousProductId = index > 0 ? productList[index - 1].id : productList[productList.length - 1].id;

  const serializedProduct = JSON.parse(JSON.stringify(product));
  // const serializedProduct = {
  //   id: product.id,
  //   name: product.name,
  //   description: product.description,
  //   images: product.images || null,
  //   default_price: product.default_price
  // }
  return (
    <ProductDetails
    product={serializedProduct}
    previousProductId={previousProductId}
    nextProductId={nextProductId}
    />
  );
}