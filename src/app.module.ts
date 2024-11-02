import { Module } from '@nestjs/common'
import { ProjectModule } from './modules/project/project.module'
import { ClientModule } from './modules/clients/client.module'
import { IpfsModule } from './modules/ipfs/ipfs.module'
import { ConfigModule } from '@nestjs/config'
import register from './config/register'

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [register],
			isGlobal: true
		}),
		ClientModule,
		ProjectModule
	]
})
export class AppModule {}
