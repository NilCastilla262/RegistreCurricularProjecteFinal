// groups.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, map } from 'rxjs';
import { GroupModel } from '../models/groups/group.model';
import { GroupDTO } from '../models/groups/group.dto';

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
}
