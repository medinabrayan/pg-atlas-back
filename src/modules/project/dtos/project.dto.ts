import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DonationDto } from './donation.dto';



export class ProjectDto {
	@ApiProperty({ example: '123Carbon' })
	projectName: string

	@ApiProperty({ example: 'Start-up' })
	organizationType: string

	@ApiProperty({ example: '2021' })
	date: string

	@ApiProperty({ example: 'Schiphol' })
	city: string

	@ApiProperty({ example: 'Netherlands' })
	country: string

	@ApiProperty({ example: 'Europe' })
	region: string

	@ApiProperty({
		example:
			'A blockchain-based carbon insetting platform for low multimodal transport'
	})
	description: string

	@ApiProperty({ example: 'https://www.123carbon.com/' })
	website: string

	@ApiProperty({ example: 'Climate & Environment, Transport & Infrastructure' })
	energyCategory: string

	@ApiProperty({ example: 'Climate & carbon reduction' })
	subCategory: string

	@ApiProperty({ example: 'Algorand' })
	blockchain: string

	

	@ApiProperty({ example: 'Active' })
	activityStatus: string

	@ApiProperty({
		example: [
			'http://data.blockchainforgood.fr/wp-content/uploads/2024/06/algorand_400.png'
		]
	})
	blockchainImages: string[]
	
	@IsOptional()
	@ApiProperty({
		example:
			'https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-01-1024x1024.png'
	})
	sdgGoal1: string

	@IsOptional()
	@ApiProperty({
		example:
			'https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-02-1024x1024.png'
	})
	sdgGoal2: string

	@IsOptional()
	@ApiProperty({
		example:
			'https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-03-1024x1024.png'
	})
	sdgGoal3: string

	@IsOptional()
	@ApiProperty({
		example:
			'https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-04-1024x1024.png'
	})
	sdgGoal4: string

	@IsOptional()
	@ApiProperty({
		example:
			'https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-05-1024x1024.png'
	})
	sdgGoal5: string

	@IsOptional()
	@ApiProperty({
		example:
			'https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-06-1024x1024.png'
	})
	sdgGoal6: string

	@IsOptional()
	@ApiProperty({
		example:
			'https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-07-1024x1024.png'
	})
	sdgGoal7: string

	@IsOptional()
	@ApiProperty({
		example:
			'https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-08-1024x1024.png'
	})
	sdgGoal8: string

	@IsOptional()
	@ApiProperty({
		example:
			'https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-09-1024x1024.png'
	})
	sdgGoal9: string

	@IsOptional()
	@ApiProperty({
		example:
			'https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-10-1024x1024.png'
	})
	sdgGoal10: string

	@IsOptional()
	@ApiProperty({
		example:
			'https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-11-1024x1024.png'
	})
	sdgGoal11: string

	@IsOptional()
	@ApiProperty({
		example:
			'https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-12-1024x1024.png'
	})
	sdgGoal12: string

	@IsOptional()
	@ApiProperty({
		example:
			'https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-13-1024x1024.png'
	})
	sdgGoal13: string

	@IsOptional()
	@ApiProperty({
		example:
			'https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-14-1024x1024.png'
	})
	sdgGoal14: string

	@IsOptional()
	@ApiProperty({
		example:
			'https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-15-1024x1024.png'
	})
	sdgGoal15: string

	@IsOptional()
	@ApiProperty({
		example:
			'https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-16-1024x1024.png'
	})
	sdgGoal16: string

	@IsOptional()
	@ApiProperty({
		example:
			'https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-17-1024x1024.png'
	})
	sdgGoal17: string
	

	@ApiProperty({ example: 'BFGDB00001' })
	bfgid: string

	@ApiProperty({ example: 'N/A' })
	source: string

	@ApiProperty({ example: 52.3070849 })
	latitude: number

	@ApiProperty({ example: 4.7517455 })
	longitude: number

	@ApiProperty({ example: 'UQCGePPGaWxjpVQqFtYnU4XkXYT7kGeNoIgUfon5lwl7i55k' })
	wallet: string

	@ApiProperty({ example: '0x0' })
	attestationId: string

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => DonationDto) // Necesario para transformar correctamente cada objeto a DonationDto
	@ApiProperty({
		description: 'Lista de donaciones realizadas por el usuario. Por defecto es un array vacío.',
		type: [DonationDto],
		default: [], // Documenta el array vacío como valor por defecto en Swagger
	})
	@Transform(({ value }) => (value === undefined ? [] : value)) // Asigna [] si no hay valor
  	donations: DonationDto[];
	constructor() {
		this.donations = []; // Asigna [] al campo donations por defecto
	}
}
