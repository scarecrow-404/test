import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('product_translations')
export class ProductTranslation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  product_id: string;

  @Column()
  language: string;

  @Column()
  @Index({ fulltext: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Product, (product) => product.translations, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
