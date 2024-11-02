import { ApiProperty } from '@nestjs/swagger'

export class DonationDto {
	donatorAddress: string
	amount: number
	attestationId: string
	date: string
	txHah: string
}

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

	@ApiProperty({
		example: [
			'http://data.blockchainforgood.fr/wp-content/uploads/2024/06/algorand_400.png'
		]
	})
	blockchainImages: string[]

	@ApiProperty({ example: 'Active' })
	activityStatus: string

	@ApiProperty({
		example:
			'https://report.blockchainforgood.fr/wp-content/uploads/2024/03/Sustainable_Development_Goal_13Climate.svg'
	})
	sdgGoal7: string

	@ApiProperty({ example: 'N/A' })
	sdgGoal13: string

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

	@ApiProperty()
	donations: DonationDto[]
}
