

export type SeriesKey = "local" | "regular";

export interface Product {
  id: number;
  name: string;
  image: string;
  fruits: string;
  bg: string;
  price?: number;
  comingSoon?: boolean;
}

// 1. Initial Local Series Data
const initialLocal: Product[] = [
   { id: 101, name: "VAN CITY WILD BLUE RAZE ICE", image: "/images/vape1.png", fruits: "/images/fruit1.png", bg: "/images/bg1.png", textBg: "bg-blue-500", },
    { id: 102, name: "SIMILKAMEEN PEACH ICE", image: "/images/vape2.png", fruits: "/images/fruit2.png", bg: "/images/bg2.png" , textBg: "bg-peach-500"},
    { id: 103, name: "SURREY RED BULL", image: "/images/vape3.png", fruits: "/images/fruit3.png", bg: "/images/bg3.png" , textBg: "bg-pink-500"},
    { id: 104, name: "STRAWBERRY WATERMELLON", image: "/images/vape4.png", fruits: "/images/fruit4.png", bg: "/images/bg4.png", textBg: "bg-pink-500" }, 
    { id: 105, name: "VANCOUVER ISLAND KIWI PASSION FRUIT", image: "/images/vape5.png", fruits: "/images/fruit5.png", bg: "/images/bg5.png", textBg: "bg-pink-500" }, 
    { id: 106, name: "KOOTNEY CHERRY SODA", image: "/images/vape6.png", fruits: "/images/fruit6.png", bg: "/images/bg6.png", textBg: "bg-pink-500" }, 
    { id: 107, name: "RICHMOND STRAWBERRY BANANA", image: "/images/vape7.png", fruits: "/images/fruit7.png", bg: "/images/bg7.png", textBg: "bg-pink-500" }, 
    { id: 108, name: "OKANAGAN GRAPE ICE", image: "/images/vape8.png", fruits: "/images/fruit8.png", bg: "/images/bg8.png", textBg: "bg-pink-500" }, 
    { id: 109, name: "FRASER VALLEY STRAWBERRY ICE", image: "/images/vape9.png", fruits: "/images/fruit9.png", bg: "/images/bg9.png" , textBg: "bg-pink-500"}, 
    { id: 110, name: "CARIBOO WATERMELON ICE", image: "/images/vape10.png", fruits: "/images/fruit10.png", bg: "/images/bg10.png", textBg: "bg-pink-500" }, 
];

// 2. Initial Regular Series Data
const initialRegular: Product[] = [
    { id: 201, name: "BLUE RAZE ICE", image: "/images/vape1.png", fruits: "/images/fruit1.png", bg: "/images/bg1.png", textBg: "bg-blue-500"},
    { id: 202, name: "PEACH ICE", image: "/images/vape2.png", fruits: "/images/fruit2.png", bg: "/images/bg2.png", textBg: "bg-pink-500"},
    { id: 203, name: "RED BULL", image: "/images/vape3.png", fruits: "/images/fruit3.png", bg: "/images/bg3.png", textBg: "bg-pink-500"},
    { id: 204, name: "STRAWBERRY WATERMELLON", image: "/images/vape4.png", fruits: "/images/fruit4.png", bg: "/images/bg4.png", textBg: "bg-pink-500"},
    { id: 205, name: "KIWI PASSION FRUIT", image: "/images/vape5.png", fruits: "/images/fruit5.png", bg: "/images/bg5.png", textBg: "bg-pink-500"},
    { id: 206, name: "CHERRY SODA", image: "/images/vape6.png", fruits: "/images/fruit6.png", bg: "/images/bg6.png", textBg: "bg-pink-500"},
    { id: 207, name: "STRAWBERRY BANANA", image: "/images/vape7.png", fruits: "/images/fruit7.png", bg: "/images/bg7.png" , textBg: "bg-pink-500"},
    { id: 208, name: "GRAPE ICE", image: "/images/vape8.png", fruits: "/images/fruit8.png", bg: "/images/bg8.png", textBg: "bg-pink-500"},
    { id: 209, name: "STRAWBERRY ICE", image: "/images/vape9.png", fruits: "/images/fruit9.png",bg: "/images/bg9.png", textBg: "bg-pink-500"},
    { id: 210, name: "WATERMELON ICE", image: "/images/vape10.png", fruits: "/images/fruit10.png",bg: "/images/bg10.png", textBg: "bg-pink-500"},
];

// 3. Dynamic Coming Soon List

const comingSoonList: Product[] = [
  "Banana Taffy Freeze", "Blackberry B-Pop", "Sour Mango Pineapple",
  "Strawberry Colada", "Lemon Heads", "Grapefruit Refresher",
  "Blackberry Blueberry", "Dragon Fruit ice", "Cool Mint", "Sour Apple ice"
].map((name, index) => ({
  id: 301 + index,
  name: name.toUpperCase(),
  // Yahan default local images assign kar di hain
  image: "/images/vape1.png", 
  fruits: "/images/fruit1.png", 
  bg: "/images/bg1.png", 
  textBg: "bg-zinc-800", 
  comingSoon: true
}));
// 4. Final Export with Merged Data
export const seriesData: Record<SeriesKey, Product[]> = {
  local: [...initialLocal, ...comingSoonList],
  regular: [...initialRegular, ...comingSoonList],
};