import { ApiProperty } from '@nestjs/swagger';

export class EnergyCategoryDTO {
  @ApiProperty({ description: 'Nombre de la categoria' })
  name: string;

  @ApiProperty({ description: 'Color de la categoria' })
  color: string;
}