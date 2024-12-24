import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ProductTranslation } from './product-translation.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ProductTranslation, (translation) => translation.product, {
    cascade: true,
    eager: true,
  })
  translations: ProductTranslation[];
}
