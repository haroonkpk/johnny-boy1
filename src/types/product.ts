export type SeriesKey = "local" | "regular";

export interface Product {
  _id?: string;
  id?: string;
  name: string;
  price: number;
  image: string;
  fruits: string;
  bg: string;
  series: SeriesKey;
  comingSoon: boolean;
  description?: string;
}
