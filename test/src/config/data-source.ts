import { DataSource, DataSourceOptions } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { ProductTranslation } from '../products/entities/product-translation.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres' as const,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'products_db',
  synchronize: false,
  logging: true,
  entities: [Product, ProductTranslation],
  migrations: ['dist/migrations/*.js'],
};

export const AppDataSource = new DataSource(dataSourceOptions);
