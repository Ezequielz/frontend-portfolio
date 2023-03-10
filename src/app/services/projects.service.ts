import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Project } from '../model/project';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  URL = environment.URL + 'project/';

  constructor( private httpClient: HttpClient ) {

  }

  public lista(): Observable<Project[]>{
      return this.httpClient.get<Project[]>(this.URL + 'lista');
  }

  public detail(id: number): Observable<Project>{
    return this.httpClient.get<Project>(this.URL + `detail/${ id }`);
  }

  public save(project: Project): Observable<any>{
    return this.httpClient.post<any>(this.URL + `create`, project);
  }

  public update(id:number, project: Project ): Observable<any>{
    return this.httpClient.put<any>(this.URL + `edit/${id}`, project);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.URL + `delete/${id}`);
  }
}
