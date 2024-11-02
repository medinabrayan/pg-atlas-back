import { registerAs } from '@nestjs/config'

export default registerAs('config', () => {
	return {
		lighthouse: {
			apiKey: process.env.LIGHTHOUSE_API_KEY,
			gateway: process.env.LIGHTHOUSE_GATEWAY
		},
		wallet: {
			address: process.env.WALLET_PUBLIC_KEY,
			mnemonic: process.env.WALLET_PRIVATE_KEY
		}
	}
})
