import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsHexColor } from 'class-validator';

export class EnergyCategoryDTO {
  @ApiProperty({ example: 'Climate & Environment', description: 'Nombre de la categoría de energía' })
  @IsString()
  name: string;

  @ApiProperty({ example: '#44d9e1', description: 'Color hexadecimal de la categoría' })
  @IsHexColor()
  color: string;
}