import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class DonationDto {

  @ApiProperty({ description: 'Dirección del donador' })
  @IsString()
  donatorAddress: string;

  @ApiProperty({ description: 'Cantidad donada', example: 100 })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Fecha de la donación en formato ISO', example: '2023-01-01T00:00:00Z'})
  @IsString()
  date: string;

  @ApiProperty({ description: 'Hash de la transacción' })
  @IsString()
  txHash: string;
}