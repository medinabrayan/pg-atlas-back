import { Controller, Get, Put, Body, Query, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ProjectDto } from './dto/project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('all')
  getProject() {
    return this.projectService.getProject();
  }

  @Put()
  updateProject(@Body() updatedProject: any) {
    this.projectService.updateProject(updatedProject);
    return { message: 'Project updated successfully' };
  }

  @ApiOperation({ summary: 'Filter projects' })
  @ApiResponse({ status: 200, description: 'Returns filtered projects.' })
  @ApiQuery({ name: 'city', required: false, description: 'Filter by city', example: 'Schiphol' })
  @ApiQuery({ name: 'country', required: false, description: 'Filter by country', example: 'Netherlands' })
  @ApiQuery({ name: 'activityStatus', required: false, description: 'Filter by activity status', example: 'Active' })
  @ApiQuery({ name: 'blockchain', required: false, description: 'Filter by blockchain technology', example: 'Algorand' })
  @Get('filter')
  filterProject(@Query() filters: Partial<Record<string, any>>) {
    return this.projectService.filterProjects(filters);
  }

  @ApiOperation({ summary: 'Get unique blockchains' })
  @ApiResponse({ status: 200, description: 'Returns a list of unique blockchains.' })
  @Get('blockchains')
  getUniqueBlockchains() {
    return this.projectService.getUniqueBlockchains();
  }

  @ApiOperation({ summary: 'Add a new project' })
  @ApiResponse({ status: 201, description: 'The project has been successfully created.' })
  @ApiBody({ type: ProjectDto })
  @Post()
  addProject(@Body() newProject: ProjectDto) {
    this.projectService.addProject(newProject);
    return { message: 'Project added successfully' };
  }



}