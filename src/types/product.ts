export interface Product {
  _id?: string;
  id?: string;
  name: string;
  price: number;
  image: string;
  fruits: string;
  bg: string;
  series: "local" | "regular";
  comingSoon: boolean;
  description?: string;
}
