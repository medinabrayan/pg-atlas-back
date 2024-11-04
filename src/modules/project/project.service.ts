import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import { ProjectDto } from './dtos/project.dto'
import { IpfsService } from '../ipfs/ipfs.service'
import { AddDonationDto } from './dtos/add_donation.dto'

@Injectable()
export class ProjectService {
	private readonly dbPath: string = path.resolve(__dirname, '../../db.json')
	private readonly apiPath: string = path.resolve(__dirname, '../../api.json')

	constructor(private readonly ipfsService: IpfsService) {}

	private readDataFromPath(filePath: string): any {
		const data = fs.readFileSync(filePath, 'utf8')
		return JSON.parse(data)
	}

	private writeData(filePath: string, data: any): void {
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
	}

	// GET

	getProjects(): any {
		const projects = this.readDataFromPath(this.dbPath)
		return projects
	}

	getUniqueBlockchains(): string[] {
		const projects = this.readDataFromPath(this.dbPath)

		const uniqueBlockchains = new Set<string>()

		projects.forEach(project => {
			const blockchains = project.blockchain.split(',').map(b => b.trim())
			blockchains.forEach(blockchain => uniqueBlockchains.add(blockchain))
		})

		return Array.from(uniqueBlockchains)
	}

	filterProjects(filters: Partial<Record<string, any>>): any[] {
		const projects = this.readDataFromPath(this.dbPath)

		return projects.filter(project =>
			Object.keys(filters).every(key => {
				if (key === 'category') {
					return project.energyCategory?.name?.includes(filters[key])
				} else {
					return filters[key] === project[key]
				}
			})
		)
	}

	// POST

	async addProject(newProject: ProjectDto): Promise<void> {
		try {
			const projects = this.readDataFromPath(this.dbPath)
			projects.push(newProject)

			this.writeData(this.dbPath, projects)

			const projectsUrl: string = await this.ipfsService.storeObject(projects)
			this.writeData(this.apiPath, { projectsUrl })
		} catch (error) {
			console.error('❌', error)
			throw new InternalServerErrorException(error)
		}
	}

	//PATCH
	async addDonation(addDonationDto: AddDonationDto): Promise<void> {
		const { projectName, donation } = addDonationDto;
	
		try {
		  // Lee los datos actuales de los proyectos
		  const projects = this.readDataFromPath(this.dbPath);
	
		  // Encuentra el proyecto basado en el nombre
		  const project = projects.find(p => p.projectName === projectName);
	
		  // Lanza una excepción si no se encuentra el proyecto
		  if (!project) {
			throw new NotFoundException(`Proyecto con nombre ${projectName} no encontrado`);
		  }
	
		  // Si el proyecto tiene donaciones, añade la nueva; si no, inicializa el array
		  if (!Array.isArray(project.donations)) {
			project.donations = [];
		  }
		  project.donations.push(donation);
	
		  // Guarda los datos actualizados localmente
		  this.writeData(this.dbPath, projects);
	
		  // Sube los datos actualizados a IPFS y guarda la URL resultante
		  const projectsUrl: string = await this.ipfsService.storeObject(projects);
		  this.writeData(this.apiPath, { projectsUrl });
		  
		} catch (error) {
		  console.error('❌ Error al agregar la donación:', error);
		  throw new InternalServerErrorException('Error al agregar la donación al proyecto');
		}
	  }

	

	// PUT

	// async updateProject(updatedProject: any): Promise<void> {
	// 	try {
	// 		const projects = this.readDataFromPath(this.dbPath)
	// 		projects.project = { ...projects.project, ...updatedProject }

	// 		this.writeData(this.dbPath, projects)

	// 		const projectsUrl: string = await this.ipfsService.storeObject(projects)
	// 		this.writeData(this.apiPath, { projectsUrl })
	// 	} catch (error) {
	// 		console.error('❌', error)
	// 		throw new InternalServerErrorException(error)
	// 	}
	// }




	// DELETE
	async deleteProject(): Promise<void> {
		try {
			const projects = this.readDataFromPath(this.dbPath)
			projects.pop();

			this.writeData(this.dbPath, projects)

			const projectsUrl: string = await this.ipfsService.storeObject(projects)
			this.writeData(this.apiPath, { projectsUrl })
		} catch (error) {
			console.error('❌', error)
			throw new InternalServerErrorException(error)
		}
	}
}
