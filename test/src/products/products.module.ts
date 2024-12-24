import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTranslation } from './entities/product-translation.entity';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTranslation, Product])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
