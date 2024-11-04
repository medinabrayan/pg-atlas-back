import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DonationDto } from './donation.dto';

export class AddDonationDto {
  @ApiProperty({
    description: 'Nombre del proyecto al cual se añadirá la donación',
    example: 'Climate Project'
  })
  @IsString()
  @IsNotEmpty()
  projectName: string;

  @ApiProperty({
    description: 'Donación a añadir al proyecto',
    type: DonationDto,
    example: {
      donatorAddress: '0x123...',
      amount: 100,
      date: '2023-01-01T00:00:00Z',
      txHash: '0xabc...'
    }
  })
  @ValidateNested()
  @Type(() => DonationDto) // Asegura que la donación se valide correctamente
  donation: DonationDto;
}