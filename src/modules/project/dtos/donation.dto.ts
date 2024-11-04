import { ApiProperty } from '@nestjs/swagger';

export class DonationDto {
  @ApiProperty({ description: 'Dirección del donador' })
  donatorAddress: string;

  @ApiProperty({ description: 'Cantidad donada', example: 100 })
  amount: number;

  @ApiProperty({ description: 'ID de la atestación' })
  attestationId: string;

  @ApiProperty({ description: 'Fecha de la donación en formato ISO', example: '2023-01-01T00:00:00Z' })
  date: string;

  @ApiProperty({ description: 'Hash de la transacción' })
  txHash: string;
}