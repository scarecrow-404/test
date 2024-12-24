export interface ProductTranslation {
  id: string;
  product_id: string;
  language: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ProductResponse {
  id: string;
  translations: ProductTranslation[];
}
