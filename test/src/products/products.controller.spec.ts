import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductsDto } from './dto/search-products.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProductsService = {
    createProduct: jest.fn(),
    searchProducts: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const createProductDto: CreateProductDto = {
        translations: [
          {
            name: 'Test Product',
            description: 'Test Description',
            language: 'en',
          },
        ],
      };

      const expectedResponse = {
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
      };

      mockProductsService.createProduct.mockResolvedValue(expectedResponse);

      const result = await controller.createProduct(createProductDto);

      expect(service.createProduct).toHaveBeenCalledWith(createProductDto);
      expect(result).toBe(expectedResponse);
    });
  });

  describe('searchProducts', () => {
    it('should search products with given criteria', async () => {
      const searchDto: SearchProductsDto = {
        query: 'test',
        language: 'en',
        page: 1,
        limit: 10,
      };

      const expectedResponse = {
        data: [
          {
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
          },
        ],
        pagination: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      };

      mockProductsService.searchProducts.mockResolvedValue(expectedResponse);

      const result = await controller.searchProducts(searchDto);

      expect(service.searchProducts).toHaveBeenCalledWith(searchDto);
      expect(result).toBe(expectedResponse);
    });
  });
});
