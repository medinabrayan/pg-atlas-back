import kavach from '@lighthouse-web3/kavach'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { ethers } from 'ethers'
import register from 'src/config/register'

@Injectable()
export class LightHouseClient {
	private gateway: string
	private publicKey: string
	private apiKey: string

	constructor(
		@Inject(register.KEY)
		private readonly configService: ConfigType<typeof register>
	) {
		this.initializeGateway()
		this.initializePublicKey()
		this.initializeApiKey()
	}

	private initializeGateway(): void {
		const { lighthouse } = this.configService
		this.gateway = lighthouse.gateway
	}

	private initializePublicKey(): void {
		const { wallet } = this.configService
		const publicKey: string = wallet.address

		this.publicKey = publicKey
	}

	private initializeApiKey(): void {
		const { lighthouse } = this.configService
		this.apiKey = lighthouse.apiKey
	}

	public getGateway(): string {
		return this.gateway
	}

	public getPublicKey(): string {
		return this.publicKey
	}

	public getApiKey(): string {
		return this.apiKey
	}

	public async getJWT(): Promise<string> {
		const { wallet } = this.configService
		const privateKey: string = wallet.mnemonic
		const signer: ethers.Wallet = new ethers.Wallet(privateKey)

		const authMessage = await kavach.getAuthMessage(signer.address)
		const signedMessage = await signer.signMessage(authMessage.message)
		const { JWT, error } = await kavach.getJWT(signer.address, signedMessage)
		return JWT
	}
}
