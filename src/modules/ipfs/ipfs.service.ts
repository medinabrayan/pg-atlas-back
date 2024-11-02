import lighthouse from '@lighthouse-web3/sdk'
import {
	Inject,
	Injectable,
	InternalServerErrorException
} from '@nestjs/common'
import { LightHouseClient } from '../clients/lighthouse.client'

type Hash = {
	Name: string
	Hash: string
	Size: string
}

@Injectable()
export class IpfsService {
	private readonly gateway: string
	private readonly apiKey: string

	constructor(
		@Inject('LightHouseClient') private lightHouseClient: LightHouseClient
	) {
		this.gateway = this.lightHouseClient.getGateway()
		this.apiKey = this.lightHouseClient.getApiKey()
	}

	// POST

	async storeObject(object: unknown): Promise<string> {
		try {
			const response = (await lighthouse.uploadText(
				JSON.stringify(object),
				this.apiKey
			)) as { data: Hash }

			const hash: string = response.data.Hash
			return `${this.gateway}/ipfs/${hash}`
		} catch (error) {
			throw new InternalServerErrorException(error)
		}
	}
}
