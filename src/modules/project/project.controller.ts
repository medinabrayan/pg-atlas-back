import { Controller, Get, Put, Body, Query, Post, Delete, Patch } from '@nestjs/common'
import { ProjectService } from './project.service'
import { ApiBody, ApiExcludeEndpoint, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger'
import { ProjectDto } from './dtos/project.dto'
import { AddDonationDto } from './dtos/add_donation.dto'

@Controller('projects')
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}

	@Get('getProjects')
	getProjects() {
		return this.projectService.getProjects()
	}

	// @Put()
	// updateProject(@Body() updatedProject: any) {
	// 	this.projectService.updateProject(updatedProject)
	// 	return { message: 'Project updated successfully' }
	// }
	@ApiExcludeEndpoint()
	@Patch('donation')
	@ApiOperation({ summary: 'Agregar una donación de un proyecto' })
	@ApiResponse({ status: 200, description: 'Proyecto actualizado correctamente' })
	@ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
	async updateDonations(@Body() addDonationDto: AddDonationDto) {
	  return this.projectService.addDonation(addDonationDto);
	}

	@ApiOperation({ summary: 'Filter projects' })
	@ApiResponse({ status: 200, description: 'Returns filtered projects.' })
	@ApiQuery({
		name: 'date',
		required: false,
		description: 'Filter by date',
		example: '2024'
	})
	@ApiQuery({
		name: 'region',
		required: false,
		description: 'Filter by region',
		example: 'Africa'
	})
	@ApiQuery({
		name: 'country',
		required: false,
		description: 'Filter by country',
		example: 'Netherlands'
	})
	@ApiQuery({
		name: 'organizationType',
		required: false,
		description: 'Filter by organization type'
	})
	@ApiQuery({
		name: 'blockchain',
		required: false,
		description: 'Filter by blockchain technology',
		example: 'Ethereum'
	})
	@ApiQuery({
		name: 'category',
		required: false,
		description: 'Filter by category',
		example: 'Agriculture & Food'
	})
	@ApiQuery({
		name: 'activityStatus',
		required: false,
		description: 'Filter by activity status',
		example: 'Active'
	})
	@Get('filter')
	filterProject(@Query() filters: Partial<Record<string, any>>) {
		return this.projectService.filterProjects(filters)
	}

	@ApiOperation({ summary: 'Get unique blockchains' })
	@ApiResponse({
		status: 200,
		description: 'Returns a list of unique blockchains.'
	})
	@Get('blockchains')
	getUniqueBlockchains() {
		return this.projectService.getUniqueBlockchains()
	}

	@ApiOperation({ summary: 'Add a new project' })
	@ApiResponse({
		status: 201,
		description: 'The project has been successfully created.'
	})
	@ApiBody({ type: ProjectDto })
	@Post()
	addProject(@Body() newProject: ProjectDto) {
		this.projectService.addProject(newProject)
		return { message: 'Project added successfully' }
	}

	//BORRAR ULTIMO PROYECTO
	@ApiExcludeEndpoint()
	@Delete('delete_lastproject')
	deleteProject() {
		this.projectService.deleteProject()
		return { message: 'Project deleted successfully' }
	}
}
