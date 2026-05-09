export type SeriesKey = "local" | "regular";

export interface FeatureItem {
  id: number;
  name: string;
  image: string;
  fruits: string;
  bg: string;
}

export const seriesData: Record<SeriesKey, FeatureItem[]> = {
  local: [
    { id: 101, name: "Local Mint", image: "/images/vape1.png", fruits: "/images/fruit1.png", bg: "/images/bg1.png" },
    { id: 102, name: "Local Berry", image: "/images/vape2.png", fruits: "/images/fruit2.png", bg: "/images/bg2.png" },
    { id: 103, name: "Local Mango", image: "/images/vape3.png", fruits: "/images/fruit3.png", bg: "/images/bg3.png" },
    { id: 104, name: "Local Mango 2", image: "/images/vape4.png", fruits: "/images/fruit3.png", bg: "/images/bg4.png" }, 
    { id: 105, name: "Local Mango 3", image: "/images/vape5.png", fruits: "/images/fruit3.png", bg: "/images/bg5.png" }, 
    { id: 106, name: "Local Mango 4", image: "/images/vape6.png", fruits: "/images/fruit3.png", bg: "/images/bg6.png" }, 
    { id: 107, name: "Local Mango 5", image: "/images/vape7.png", fruits: "/images/fruit3.png", bg: "/images/bg7.png" }, 
    { id: 108, name: "Local Mango 6", image: "/images/vape8.png", fruits: "/images/fruit3.png", bg: "/images/bg8.png" }, 
    { id: 109, name: "Local Mango 7", image: "/images/vape9.png", fruits: "/images/fruit3.png", bg: "/images/bg9.png" }, 
    { id: 110, name: "Local Mango 8", image: "/images/vape10.png", fruits: "/images/fruit3.png", bg: "/images/bg10.png" }, 
  ],
  regular: [
    { id: 201, name: "Reg Classic", image: "/images/vape1.png", fruits: "/images/fruit3.png", bg: "/images/bg1.png"},
    { id: 202, name: "Reg Ice", image: "/images/vape2.png", fruits: "/images/fruit1.png", bg: "/images/bg2.png"},
    { id: 203, name: "Reg Gold", image: "/images/vape3.png", fruits: "/images/fruit2.png", bg: "/images/bg3.png"},
    { id: 204, name: "Reg Platinum", image: "/images/vape4.png", fruits: "/images/fruit2.png", bg: "/images/bg4.png"},
    { id: 205, name: "Reg Silver", image: "/images/vape5.png", fruits: "/images/fruit2.png", bg: "/images/bg5.png"},
    { id: 206, name: "Reg Bronze", image: "/images/vape6.png", fruits: "/images/fruit2.png", bg: "/images/bg6.png"},
    { id: 207, name: "Reg Diamond", image: "/images/vape7.png", fruits: "/images/fruit2.png", bg: "/images/bg7.png" },
    { id: 208, name: "Reg Premium", image: "/images/vape8.png", fruits: "/images/fruit2.png", bg: "/images/bg8.png"},
    { id: 209, name: "Reg Elite", image: "/images/vape9.png", fruits: "/images/fruit2.png",bg: "/images/bg9.png"},
    { id: 210, name: "Reg Limited", image: "/images/vape10.png", fruits: "/images/fruit2.png",bg: "/images/bg10.png"},
  ],
};
