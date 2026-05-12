import { getProducts } from "@/actions/product";
import RetailerClient from "./RetailerClient";

export default async function RetailerPage() {
  const products = await getProducts();
  
  return <RetailerClient initialProducts={products} />;
}
