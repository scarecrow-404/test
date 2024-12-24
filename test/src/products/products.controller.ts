import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductsDto } from './dto/search-products.dto';
import { ProductResponse } from './interfaces/product.interface';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product with translations' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductResponse> {
    return this.productsService.createProduct(createProductDto);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search products by name in any language' })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated product results',
  })
  async searchProducts(@Query(ValidationPipe) searchDto: SearchProductsDto) {
    return this.productsService.searchProducts(searchDto);
  }
}
