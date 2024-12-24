import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { dataSourceOptions } from './config/data-source';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), ProductsModule],
})
export class AppModule {}
