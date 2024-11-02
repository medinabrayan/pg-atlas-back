import { Global, Module } from '@nestjs/common'
import { LightHouseClient } from './lighthouse.client'

@Global()
@Module({
	providers: [
		{
			provide: 'LightHouseClient',
			useClass: LightHouseClient
		}
	],
	exports: ['LightHouseClient']
})
export class ClientModule {}
