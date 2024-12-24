import { IsArray, IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProductTranslationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  language: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;
}

export class CreateProductDto {
  @ApiProperty({ type: [ProductTranslationDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductTranslationDto)
  translations: ProductTranslationDto[];
}
