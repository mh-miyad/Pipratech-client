export type ProductCategory = "bags" | "fabric" | "yarn" | "crafts" | "ropes" | "geo-textile";

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: ProductCategory;
  featured?: boolean;
}
