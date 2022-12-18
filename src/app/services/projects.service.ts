import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProjects } from '../interfaces/project';
import { Observable } from 'rxjs';
import { Project } from '../model/project';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  projectURL = 'http://localhost:8080/project/';

  constructor( private httpClient: HttpClient ) {

  }

  public lista(): Observable<Project[]>{
      return this.httpClient.get<Project[]>(this.projectURL + 'lista');
  }

  public detail(id: number): Observable<Project>{
    return this.httpClient.get<Project>(this.projectURL + `detail/${ id }`);
  }

  public save(project: Project): Observable<any>{
    return this.httpClient.post<any>(this.projectURL + `create`, project);
  }

  public update(id:number, project: Project ): Observable<any>{
    return this.httpClient.put<any>(this.projectURL + `edit/${id}`, project);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.projectURL + `delete/${id}`);
  }
}
