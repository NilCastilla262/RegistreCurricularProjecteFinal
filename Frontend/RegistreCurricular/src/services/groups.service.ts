// groups.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, map } from 'rxjs';
import { GroupModel } from '../models/groups/group.model';
import { GroupDTO } from '../models/groups/group.dto';

export interface ResumeRow {
  Subject: string;
  CompetencyDescription: string;
  OrderByCompetency: number;
  CriteriaDescription: string;
  OrderByMainCriteria: number;
  OrderByCriteria: number;
  TotalWorked: number;
}

@Injectable({
  providedIn: 'root'
})

export class GroupsService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getGroupsFromUser(): Observable<GroupModel[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/groups`)
      .pipe(
        map(apiArray => GroupDTO.fromApiArray(apiArray))
      );
  }
  getResume(groupUUIDs: string[]): Observable<ResumeRow[]> {
    const params = new HttpParams().set('groups', groupUUIDs.join(','));
    return this.http.get<ResumeRow[]>(`${this.baseUrl}/groups/resume`, { params });
  }
}
