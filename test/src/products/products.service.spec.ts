import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductTranslation } from './entities/product-translation.entity';
import { Repository } from 'typeorm';

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepository: Repository<Product>;
  let translationRepository: Repository<ProductTranslation>;

  const mockQueryBuilder = {
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn(),
  };

  const mockProductRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockTranslationRepository = {
    createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
        {
          provide: getRepositoryToken(ProductTranslation),
          useValue: mockTranslationRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
    translationRepository = module.get<Repository<ProductTranslation>>(
      getRepositoryToken(ProductTranslation),
    );
  });

  describe('createProduct', () => {
    it('should create a new product with translations', async () => {
      const createProductDto = {
        translations: [
          {
            name: 'Test Product',
            description: 'Test Description',
            language: 'en',
          },
        ],
      };

      const createdProduct = {
        id: 1,
        translations: [
          {
            id: 1,
            name: 'Test Product',
            description: 'Test Description',
            language: 'en',
            created_at: new Date('2024-01-01'),
            updated_at: new Date('2024-01-01'),
          },
        ],
      };

      mockProductRepository.create.mockReturnValue(createdProduct);
      mockProductRepository.save.mockResolvedValue(createdProduct);

      const result = await service.createProduct(createProductDto);

      expect(productRepository.create).toHaveBeenCalledWith({
        translations: createProductDto.translations,
      });
      expect(productRepository.save).toHaveBeenCalledWith(createdProduct);
      expect(result).toEqual({
        id: 1,
        translations: [
          {
            id: 1,
            name: 'Test Product',
            description: 'Test Description',
            language: 'en',
            created_at: '2024-01-01T00:00:00.000Z',
            updated_at: '2024-01-01T00:00:00.000Z',
          },
        ],
      });
    });
  });

  describe('searchProducts', () => {
    it('should search products with given criteria', async () => {
      const searchDto = {
        query: 'test',
        language: 'en',
        page: 1,
        limit: 10,
      };

      const mockProducts = [
        {
          id: 1,
          translations: [
            {
              id: 1,
              name: 'Test Product',
              description: 'Test Description',
              language: 'en',
              created_at: new Date('2024-01-01'),
              updated_at: new Date('2024-01-01'),
            },
          ],
        },
      ];

      mockQueryBuilder.getManyAndCount.mockResolvedValue([mockProducts, 1]);

      const result = await service.searchProducts(searchDto);

      expect(translationRepository.createQueryBuilder).toHaveBeenCalledWith(
        'translation',
      );
      expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'translation.product',
        'product',
      );
      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        `to_tsvector('english', translation.name) @@ plainto_tsquery('english', :query)`,
        { query: 'test' },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'translation.language = :language',
        { language: 'en' },
      );
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(0);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(10);
      expect(result).toEqual({
        data: mockProducts,
        pagination: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      });
    });

    it('should search products without optional parameters', async () => {
      const searchDto = {
        page: 1,
        limit: 10,
      };

      const mockProducts = [];
      mockQueryBuilder.getManyAndCount.mockResolvedValue([mockProducts, 0]);

      const result = await service.searchProducts(searchDto);

      expect(translationRepository.createQueryBuilder).toHaveBeenCalledWith(
        'translation',
      );
      expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'translation.product',
        'product',
      );
      expect(result).toEqual({
        data: mockProducts,
        pagination: {
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 0,
        },
      });
    });
  });
});
