import { Injectable } from '@nestjs/common';
import { SearchProductsDto } from './dto/search-products.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTranslation } from './entities/product-translation.entity';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { toProductResponse } from './mappers/product.mapper';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductTranslation)
    private readonly translationRepository: Repository<ProductTranslation>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async searchProducts(searchDto: SearchProductsDto) {
    const { query, language, page = 1, limit = 10 } = searchDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.translationRepository
      .createQueryBuilder('translation')
      .leftJoinAndSelect('translation.product', 'product');

    if (query) {
      queryBuilder.where(
        `to_tsvector('english', translation.name) @@ plainto_tsquery('english', :query)`,
        { query },
      );
    }

    if (language) {
      queryBuilder.andWhere('translation.language = :language', { language });
    }

    const [data, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .orderBy('translation.name', 'ASC')
      .getManyAndCount();

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
  async createProduct(createProductDto: CreateProductDto) {
    const product = this.productRepository.create({
      translations: createProductDto.translations,
    });
    const result = await this.productRepository.save(product);
    return toProductResponse(result);
  }
}
