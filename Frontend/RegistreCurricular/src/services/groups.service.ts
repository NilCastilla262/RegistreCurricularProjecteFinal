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
  private baseUrl = `${environment.baseUrl}/groups`;

  constructor(private http: HttpClient) {}

  getGroupsFromUser(): Observable<GroupModel[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}`)
      .pipe(
        map(apiArray => GroupDTO.fromApiArray(apiArray))
      );
  }
  getResume(groupUUIDs: string[]): Observable<ResumeRow[]> {
    const params = new HttpParams().set('groups', groupUUIDs.join(','));
    return this.http.get<ResumeRow[]>(`${this.baseUrl}/resume`, { params });
  }

  getGroupsByYear(year: string): Observable<GroupModel[]> {
    const params = new HttpParams().set('year', year);
    return this.http
      .get<any[]>(`${this.baseUrl}/center`, { params })
      .pipe(map(apiArray => GroupDTO.fromApiArray(apiArray)));
  }

    createGroup(name: string, courseName: string): Observable<GroupModel> {
    const payload = { Name: name, CourseName: courseName };
    return this.http
      .post<any>(`${this.baseUrl}`, payload)
      .pipe(map(apiData => GroupDTO.fromApi(apiData)));
  }

  updateGroupName(uuid: string, newName: string): Observable<GroupModel> {
    const payload = { Name: newName };
    return this.http
      .put<any>(`${this.baseUrl}/${encodeURIComponent(uuid)}`, payload)
      .pipe(map(apiData => GroupDTO.fromApi(apiData)));
  }

  deleteGroup(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${encodeURIComponent(uuid)}`);
  }
}
