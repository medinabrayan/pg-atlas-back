import { Module } from '@nestjs/common'
import { IpfsController } from './ipfs.controller'
import { IpfsService } from './ipfs.service'

@Module({
	imports: [],
	controllers: [IpfsController],
	providers: [IpfsService],
	exports: [IpfsService]
})
export class IpfsModule {}
