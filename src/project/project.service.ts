import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectService {
  private dbPath = path.resolve(__dirname, '../../db.json');

  private readData(): any {
    const data = fs.readFileSync(this.dbPath, 'utf8');
    return JSON.parse(data);
  }

  private writeData(data: any): void {
    fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2), 'utf8');
  }

  // Obtener el proyecto
  getProject(): any {
    const db = this.readData();
    return db;
  }

  // Actualizar proyecto
  updateProject(updatedProject: any): void {
    const db = this.readData();
    db.project = { ...db.project, ...updatedProject };
    this.writeData(db);
  }

  filterProjects(filters: Partial<Record<string, any>>): any[] {
    const projects = this.readData();

    // Filtramos cada proyecto usando todos los criterios
    return projects.filter(project => 
      Object.keys(filters).every(key => 
        filters[key] === project[key]
      )
    );
  }

  getUniqueBlockchains(): string[] {
    const projects = this.readData();

    // Usar un Set para almacenar blockchains únicas
    const uniqueBlockchains = new Set<string>();

    projects.forEach(project => {
      const blockchains = project.blockchain.split(',').map(b => b.trim());
      blockchains.forEach(blockchain => uniqueBlockchains.add(blockchain));
    });

    return Array.from(uniqueBlockchains); // Convertir el Set en un array
  }

  addProject(newProject: ProjectDto): void {
    const projects = this.readData();
    projects.push(newProject);
    this.writeData(projects);
  }


}