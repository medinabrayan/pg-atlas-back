import { Module } from '@nestjs/common'
import { ProjectService } from './project.service'
import { ProjectController } from './project.controller'
import { IpfsModule } from '../ipfs/ipfs.module'

@Module({
	imports: [IpfsModule],
	providers: [ProjectService],
	controllers: [ProjectController]
})
export class ProjectModule {}
