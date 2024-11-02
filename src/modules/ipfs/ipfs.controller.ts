import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger'
import { IpfsService } from './ipfs.service'

@ApiTags('ipfs')
@Controller('ipfs')
export class IpfsController {
	constructor(private readonly ipfsService: IpfsService) {}

	// POST
	@Post('/store-any-object')
	@ApiOperation({ summary: 'Store any object in IPFS' })
	@ApiBody({
		description: 'Project data object to store in IPFS',
		schema: {
			type: 'object',
			example: {
				projectName: 'EstateX',
				organizationType: 'Start-up',
				date: '2020',
				city: 'Amsterdam',
				country: 'Netherlands',
				region: 'Europe',
				description:
					'A Real Estate tokenization ecosystem accessible to everyone',
				website: 'https://www.estatex.eu/',
				energyCategory: {
					name: 'Identity & Ownership, Finance & Insurance',
					color: '#9C27B0'
				},
				subCategory: 'Land & Titling',
				blockchain: 'Polygon',
				blockchainImages: [
					'http://data.blockchainforgood.fr/wp-content/uploads/2024/06/polygon_400.png',
					'https://data.blockchainforgood.fr/'
				],
				activityStatus: 'Active',
				sdgGoal7:
					'https://report.blockchainforgood.fr/wp-content/uploads/2024/03/Sustainable_Development_Goal_01NoPoverty.svg',
				sdgGoal13:
					'https://report.blockchainforgood.fr/wp-content/uploads/2024/03/Sustainable_Development_Goal_09Industry.svg',
				bfgid: 'BFGDB00596',
				source: 'JAFS juillet',
				latitude: 52.3675734,
				longitude: 4.9041389,
				wallet: 'UQCGePPGaWxjpVQqFtYnU4XkXYT7kGeNoIgUfon5lwl7i55k',
				donations: [
					{
						donator: '0x1234567890',
						amount: 100,
						attestationId: '0x012',
						date: '2024-11-01'
					}
				]
			}
		}
	})
	@ApiResponse({
		schema: {
			type: 'string',
			example:
				'https://gateway.lighthouse.storage/ipfs/bafkreihlqi2clorrsoaqv4nhi2kolehsyu6zsnvud5jkehqihuota55kum'
		}
	})
	async storeAnyObject(@Body() data: unknown): Promise<string> {
		return this.ipfsService.storeObject(data)
	}
}
