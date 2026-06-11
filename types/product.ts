export type ProductCategory = string;

export type ProductSpec = {
  label: string;
  value: string;
};

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  images: string[];
  coreAttributes: string[];
  technicalSpecs: ProductSpec[];
  applications: string[];
  featured?: boolean;
}
