export type SeriesKey = "local" | "regular";

export interface Product {
  id: number;
  name: string;
  image: string;
  fruits: string;
  bg: string;
  price?: number;
}

export const seriesData: Record<SeriesKey, Product[]> = {
  local: [
    { id: 101, name: "VAN CITY WILD BLUE RAZE ICE", image: "/images/vape1.png", fruits: "/images/fruit1.png", bg: "/images/bg1.png", },
    { id: 102, name: "SIMILKAMEEN PEACH ICE", image: "/images/vape2.png", fruits: "/images/fruit2.png", bg: "/images/bg2.png" , },
    { id: 103, name: "SURREY RED BULL", image: "/images/vape3.png", fruits: "/images/fruit3.png", bg: "/images/bg3.png" , },
    { id: 104, name: "STRAWBERRY WATERMELLON", image: "/images/vape4.png", fruits: "/images/fruit4.png", bg: "/images/bg4.png",  }, 
    { id: 105, name: "VANCOUVER ISLAND KIWI PASSION FRUIT", image: "/images/vape5.png", fruits: "/images/fruit5.png", bg: "/images/bg5.png",  }, 
    { id: 106, name: "KOOTNEY CHERRY SODA", image: "/images/vape6.png", fruits: "/images/fruit6.png", bg: "/images/bg6.png",  }, 
    { id: 107, name: "RICHMOND STRAWBERRY BANANA", image: "/images/vape7.png", fruits: "/images/fruit7.png", bg: "/images/bg7.png",  }, 
    { id: 108, name: "OKANAGAN GRAPE ICE", image: "/images/vape8.png", fruits: "/images/fruit8.png", bg: "/images/bg8.png",  }, 
    { id: 109, name: "FRASER VALLEY STRAWBERRY ICE", image: "/images/vape9.png", fruits: "/images/fruit9.png", bg: "/images/bg9.png" , }, 
    { id: 110, name: "CARIBOO WATERMELON ICE", image: "/images/vape10.png", fruits: "/images/fruit10.png", bg: "/images/bg10.png",  }, 
  ],
  regular: [
    { id: 201, name: "BLUE RAZE ICE", image: "/images/vape1.png", fruits: "/images/fruit1.png", bg: "/images/bg1.png", },
    { id: 202, name: "PEACH ICE", image: "/images/vape2.png", fruits: "/images/fruit2.png", bg: "/images/bg2.png", },
    { id: 203, name: "RED BULL", image: "/images/vape3.png", fruits: "/images/fruit3.png", bg: "/images/bg3.png", },
    { id: 204, name: "STRAWBERRY WATERMELLON", image: "/images/vape4.png", fruits: "/images/fruit4.png", bg: "/images/bg4.png", },
    { id: 205, name: "KIWI PASSION FRUIT", image: "/images/vape5.png", fruits: "/images/fruit5.png", bg: "/images/bg5.png", },
    { id: 206, name: "CHERRY SODA", image: "/images/vape6.png", fruits: "/images/fruit6.png", bg: "/images/bg6.png", },
    { id: 207, name: "STRAWBERRY BANANA", image: "/images/vape7.png", fruits: "/images/fruit7.png", bg: "/images/bg7.png" , },
    { id: 208, name: "GRAPE ICE", image: "/images/vape8.png", fruits: "/images/fruit8.png", bg: "/images/bg8.png", },
    { id: 209, name: "STRAWBERRY ICE", image: "/images/vape9.png", fruits: "/images/fruit9.png",bg: "/images/bg9.png", },
    { id: 210, name: "WATERMELON ICE", image: "/images/vape10.png", fruits: "/images/fruit10.png",bg: "/images/bg10.png", },
  ],
};

