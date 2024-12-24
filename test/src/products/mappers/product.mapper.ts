import { Product } from '../entities/product.entity';
import { ProductResponse } from '../interfaces/product.interface';

export const toProductResponse = (product: Product): ProductResponse => ({
  id: product.id,
  translations: product.translations.map((translation) => ({
    ...translation,
    created_at: translation.created_at.toISOString(),
    updated_at: translation.updated_at.toISOString(),
  })),
});
